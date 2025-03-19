using System.ComponentModel.DataAnnotations;

namespace BibliotecaApi.Entities;

public class Autor
{
    public int Id { get; set; }

    [Required]
    [StringLength(maximumLength: 100, ErrorMessage = "El campo {0} es demasiado largo")]
    public required string Nombre { get; set; }
    public List<Libro> Libros { get; set; } = new List<Libro>();
}