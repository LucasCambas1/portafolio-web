using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

/// <summary>Envía el mensaje del formulario a tu casilla por SMTP.</summary>
public sealed class SmtpEmailSender(IOptions<EmailOptions> options, ILogger<SmtpEmailSender> logger) : IEmailSender
{
    private readonly EmailOptions _options = options.Value;

    public async Task SendContactAsync(ContactRequest request, CancellationToken cancellationToken)
    {
        if (!_options.IsConfigured)
        {
            // Sin SMTP configurado (por ejemplo en desarrollo) solo registramos el mensaje en el log.
            logger.LogWarning(
                "SMTP sin configurar. Mensaje de {Name} <{Email}> ({Type}): {Message}",
                request.Name, request.Email, request.Type, request.Message);
            return;
        }

        var name = Clean(request.Name);
        var type = string.IsNullOrWhiteSpace(request.Type) ? "Consulta" : Clean(request.Type);

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_options.FromName, _options.FromAddress));
        message.To.Add(MailboxAddress.Parse(_options.To));
        // Reply-To con el email del visitante: al responder el correo le contestás directo a esa persona.
        message.ReplyTo.Add(new MailboxAddress(name, request.Email!.Trim()));
        message.Subject = $"[Portafolio] {type} - {name}";

        message.Body = new TextPart("plain")
        {
            Text =
                $"Nueva consulta desde el portafolio\n" +
                $"-----------------------------------\n" +
                $"Nombre: {name}\n" +
                $"Email:  {request.Email!.Trim()}\n" +
                $"Tipo:   {type}\n\n" +
                $"Mensaje:\n{request.Message!.Trim()}\n",
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(_options.Host, _options.Port, SecureSocketOptions.StartTls, cancellationToken);
        await client.AuthenticateAsync(_options.Username, _options.Password, cancellationToken);
        await client.SendAsync(message, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);

        logger.LogInformation("Consulta enviada correctamente de {Email}", request.Email);
    }

    /// <summary>Quita saltos de línea para evitar inyección de cabeceras en el asunto y el nombre.</summary>
    private static string Clean(string? value) =>
        (value ?? string.Empty).Replace("\r", " ").Replace("\n", " ").Trim();
}
