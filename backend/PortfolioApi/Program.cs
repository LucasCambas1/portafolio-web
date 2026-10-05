using System.ComponentModel.DataAnnotations;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.RateLimiting;
using PortfolioApi.Models;
using PortfolioApi.Services;

var builder = WebApplication.CreateBuilder(args);

// --- Servicios ---------------------------------------------------------------------------------

builder.Services.Configure<EmailOptions>(builder.Configuration.GetSection(EmailOptions.SectionName));

// Proveedor de email: "Smtp" (por defecto, Gmail) o "Resend" (API HTTPS; necesario en hosts que bloquean SMTP).
if (string.Equals(builder.Configuration["Email:Provider"], "Resend", StringComparison.OrdinalIgnoreCase))
{
    builder.Services.AddHttpClient<IEmailSender, ResendEmailSender>(client =>
    {
        client.BaseAddress = new Uri("https://api.resend.com/");
        client.Timeout = TimeSpan.FromSeconds(20);
    });
}
else
{
    builder.Services.AddSingleton<IEmailSender, SmtpEmailSender>();
}

// CORS: solo los orígenes (dominios del front) que figuran en la configuración.
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options =>
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins(allowedOrigins)
              .WithMethods("POST")
              .WithHeaders("Content-Type")));

// Detrás de un proxy (Render, Azure, Railway...) la IP real llega en X-Forwarded-For.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});

// Límite de envíos por IP: por defecto 5 mensajes cada 10 minutos (configurable en RateLimit:ContactPermitLimit).
var contactPermitLimit = builder.Configuration.GetValue("RateLimit:ContactPermitLimit", 5);
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("contact", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = contactPermitLimit,
                Window = TimeSpan.FromMinutes(10),
                QueueLimit = 0,
            }));
});

var app = builder.Build();

// --- Pipeline ----------------------------------------------------------------------------------

app.UseForwardedHeaders();
app.UseCors("Frontend");
app.UseRateLimiter();

// --- Endpoints ---------------------------------------------------------------------------------

app.MapGet("/", () => Results.Ok(new { service = "portfolio-api", status = "ok" }));
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.MapPost("/api/contact", async (
        ContactRequest request,
        IEmailSender emailSender,
        ILogger<Program> logger,
        CancellationToken cancellationToken) =>
    {
        // Campo trampa: si viene completo es un bot. Respondemos "ok" sin hacer nada para no darle pistas.
        if (!string.IsNullOrWhiteSpace(request.Website))
        {
            logger.LogInformation("Mensaje descartado por el campo trampa.");
            return Results.Ok(new { ok = true });
        }

        var errors = Validate(request);
        if (errors.Count > 0)
        {
            return Results.ValidationProblem(errors);
        }

        try
        {
            await emailSender.SendContactAsync(request, cancellationToken);
            return Results.Ok(new { ok = true });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "No se pudo enviar el mensaje de contacto.");
            return Results.Problem(
                title: "No se pudo enviar el mensaje.",
                statusCode: StatusCodes.Status500InternalServerError);
        }
    })
    .RequireRateLimiting("contact");

app.Run();

// --- Helpers -----------------------------------------------------------------------------------

static Dictionary<string, string[]> Validate(ContactRequest request)
{
    var results = new List<ValidationResult>();
    Validator.TryValidateObject(request, new ValidationContext(request), results, validateAllProperties: true);

    return results
        .SelectMany(r => (r.MemberNames.Any() ? r.MemberNames : [string.Empty])
            .Select(member => (Member: member, Message: r.ErrorMessage ?? "Valor no válido.")))
        .GroupBy(x => x.Member)
        .ToDictionary(g => g.Key, g => g.Select(x => x.Message).ToArray());
}

public partial class Program;
