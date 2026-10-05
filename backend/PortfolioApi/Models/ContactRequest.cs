using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

/// <summary>Datos que envía el formulario del portafolio.</summary>
public sealed class ContactRequest
{
    [Required(ErrorMessage = "El nombre es obligatorio.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "El nombre debe tener entre 2 y 100 caracteres.")]
    public string? Name { get; set; }

    [Required(ErrorMessage = "El email es obligatorio.")]
    [EmailAddress(ErrorMessage = "El email no es válido.")]
    [StringLength(150, ErrorMessage = "El email es demasiado largo.")]
    public string? Email { get; set; }

    [StringLength(60, ErrorMessage = "El tipo de consulta es demasiado largo.")]
    public string? Type { get; set; }

    [Required(ErrorMessage = "El mensaje es obligatorio.")]
    [StringLength(2000, MinimumLength = 10, ErrorMessage = "El mensaje debe tener entre 10 y 2000 caracteres.")]
    public string? Message { get; set; }

    /// <summary>Campo trampa anti-spam: los humanos lo dejan vacío, los bots suelen completarlo.</summary>
    public string? Website { get; set; }
}
