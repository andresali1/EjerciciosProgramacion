namespace BibliotecaApi.DTOs;

public class LibroConAutoresDto : LibroDto
{
    public List<AutorDto> Autores { get; set; } = [];
}