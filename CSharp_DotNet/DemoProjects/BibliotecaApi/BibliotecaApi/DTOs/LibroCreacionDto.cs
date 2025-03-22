using System.ComponentModel.DataAnnotations;

namespace BibliotecaApi.DTOs;

public class LibroCreacionDto
{
    [Required]
    [StringLength(maximumLength: 150, ErrorMessage = "El campo {0} es demasiado largo")]
    public required string Titulo { get; set; }
    public List<int> AutoresIds { get; set; } = [];
}