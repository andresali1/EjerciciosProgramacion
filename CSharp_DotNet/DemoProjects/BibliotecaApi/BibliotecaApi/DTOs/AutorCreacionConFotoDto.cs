namespace BibliotecaApi.DTOs;

public class AutorCreacionConFotoDto : AutorCreacionDto
{
    public IFormFile? Foto { get; set; }
}