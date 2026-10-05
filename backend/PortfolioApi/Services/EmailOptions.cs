namespace PortfolioApi.Services;

/// <summary>Configuración del envío de emails (sección "Email" de appsettings / variables de entorno).</summary>
public sealed class EmailOptions
{
    public const string SectionName = "Email";

    /// <summary>"Smtp" (Gmail, local) o "Resend" (API por HTTPS, para hosts que bloquean SMTP como Render gratis).</summary>
    public string Provider { get; set; } = "Smtp";

    /// <summary>API key de Resend (solo si Provider = "Resend"). Usá variable de entorno Email__ResendApiKey.</summary>
    public string ResendApiKey { get; set; } = "";

    public string Host { get; set; } = "smtp.gmail.com";
    public int Port { get; set; } = 587;

    /// <summary>Cuenta SMTP con la que se envía (ej. tu Gmail).</summary>
    public string Username { get; set; } = "";

    /// <summary>Contraseña de aplicación. Nunca la subas al repositorio: usá user-secrets o variables de entorno.</summary>
    public string Password { get; set; } = "";

    /// <summary>Nombre que se ve como remitente.</summary>
    public string FromName { get; set; } = "Portafolio web";

    /// <summary>Dirección remitente. Con Gmail debe ser la misma que Username.</summary>
    public string FromAddress { get; set; } = "";

    /// <summary>Dónde te llegan las consultas.</summary>
    public string To { get; set; } = "";

    public bool UseResend => string.Equals(Provider, "Resend", StringComparison.OrdinalIgnoreCase);

    public bool IsConfigured =>
        !string.IsNullOrWhiteSpace(FromAddress)
        && !string.IsNullOrWhiteSpace(To)
        && (UseResend
            ? !string.IsNullOrWhiteSpace(ResendApiKey)
            : !string.IsNullOrWhiteSpace(Host)
              && !string.IsNullOrWhiteSpace(Username)
              && !string.IsNullOrWhiteSpace(Password));
}
