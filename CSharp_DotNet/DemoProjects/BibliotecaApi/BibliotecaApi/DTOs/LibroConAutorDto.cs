namespace BibliotecaApi.DTOs;

public class LibroConAutorDto : LibroDto
{
    public int AutorId { get; set; }
    public required string AutorNombre { get; set; }
}