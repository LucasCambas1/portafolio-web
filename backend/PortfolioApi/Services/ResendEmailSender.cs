using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.Extensions.Options;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

/// <summary>Envía el mensaje del formulario usando la API HTTPS de Resend (no usa puertos SMTP).</summary>
public sealed class ResendEmailSender(
    HttpClient http,
    IOptions<EmailOptions> options,
    ILogger<ResendEmailSender> logger) : IEmailSender
{
    private readonly EmailOptions _options = options.Value;

    public async Task SendContactAsync(ContactRequest request, CancellationToken cancellationToken)
    {
        if (!_options.IsConfigured)
        {
            logger.LogWarning(
                "Resend sin configurar. Mensaje de {Name} <{Email}> ({Type}): {Message}",
                request.Name, request.Email, request.Type, request.Message);
            return;
        }

        var name = Clean(request.Name);
        var type = string.IsNullOrWhiteSpace(request.Type) ? "Consulta" : Clean(request.Type);
        var email = request.Email!.Trim();

        var payload = new
        {
            from = $"{_options.FromName} <{_options.FromAddress}>",
            to = new[] { _options.To },
            reply_to = email, // al responder le contestás directo al visitante
            subject = $"[Portafolio] {type} - {name}",
            text =
                $"Nueva consulta desde el portafolio\n" +
                $"-----------------------------------\n" +
                $"Nombre: {name}\n" +
                $"Email:  {email}\n" +
                $"Tipo:   {type}\n\n" +
                $"Mensaje:\n{request.Message!.Trim()}\n",
        };

        using var message = new HttpRequestMessage(HttpMethod.Post, "emails")
        {
            Content = JsonContent.Create(payload),
        };
        message.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _options.ResendApiKey);

        using var response = await http.SendAsync(message, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync(cancellationToken);
            throw new InvalidOperationException($"Resend respondió {(int)response.StatusCode}: {body}");
        }

        logger.LogInformation("Consulta enviada por Resend de {Email}", email);
    }

    private static string Clean(string? value) =>
        (value ?? string.Empty).Replace("\r", " ").Replace("\n", " ").Trim();
}
