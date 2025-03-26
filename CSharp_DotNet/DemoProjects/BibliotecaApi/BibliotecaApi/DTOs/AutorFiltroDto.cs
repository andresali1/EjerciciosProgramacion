namespace BibliotecaApi.DTOs;

public class AutorFiltroDto
{
    public int Pagina { get; set; } = 1;
    public int RecordsPorPagina { get; set; } = 10;
    public PaginacionDto PaginacionDto
    {
        get
        {
            return new PaginacionDto(Pagina, RecordsPorPagina);
        }
    }

    public string? Nombre { get; set; }
    public string? Apellidos { get; set; }
    public bool? TieneFoto { get; set; }
    public bool? TieneLibros { get; set; }
    public string? TituloLibro { get; set; }
    public bool IncluirLibros { get; set; }
    public string? CampoOrdenar { get; set; }
    public bool OrdenAscendente { get; set; } = true;
}