namespace BibliotecaApi.DTOs;

public class ComentarioDto
{
    public Guid Id { get; set; }
    public required string Cuerpo { get; set; }
    public DateTime FechaPublicacion { get; set; }
    public required string UsuarioId { get; set; }
    public required string UsuarioEmail { get; set; }
}