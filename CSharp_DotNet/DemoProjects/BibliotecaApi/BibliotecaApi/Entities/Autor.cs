using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Entities;

public class Autor
{
    public int Id { get; set; }

    [Required]
    [StringLength(maximumLength: 100, ErrorMessage = "El campo {0} es demasiado largo")]
    public required string Nombre { get; set; }

    [Required]
    [StringLength(maximumLength: 100, ErrorMessage = "El campo {0} es demasiado largo")]
    public required string Apellidos { get; set; }

    [StringLength(maximumLength: 20, ErrorMessage = "El campo {0} tiene demasiados caracteres")]
    public string? Identificacion { get; set; }

    [Unicode(false)]
    public string? Foto { get; set; }
    public List<AutorLibro> Libros { get; set; } = [];
}