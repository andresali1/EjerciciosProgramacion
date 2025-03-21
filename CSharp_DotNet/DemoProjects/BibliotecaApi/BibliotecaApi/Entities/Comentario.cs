using System.ComponentModel.DataAnnotations;

namespace BibliotecaApi.Entities;

public class Comentario
{
    public Guid Id { get; set; }

    [Required]
    public required string Cuerpo { get; set; }
    public DateTime FechaPublicacion { get; set; }
    public int LibroId { get; set; }
    public Libro? Libro { get; set; }
}