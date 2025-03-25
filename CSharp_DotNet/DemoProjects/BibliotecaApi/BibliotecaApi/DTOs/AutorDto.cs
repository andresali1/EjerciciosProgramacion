namespace BibliotecaApi.DTOs;

public class AutorDto
{
    public int Id { get; set; }
    public required string NombreCompleto { get; set; }
    public string? Foto { get; set; }
}