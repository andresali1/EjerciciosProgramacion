using System.ComponentModel.DataAnnotations;

namespace BibliotecaApi.Entities;

public class Libro
{
    public int Id { get; set; }

    [Required]
    public required string Titulo { get; set; }
    public int AutorId { get; set; }
    public Autor? Autor { get; set; }
}