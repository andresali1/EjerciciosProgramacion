namespace BibliotecaApi.DTOs;

public record PaginacionDto(int Pagina = 1, int RecordsPorPagina = 10)
{
    private const int cantidadMaximaRecordsPorPagina = 50;

    public int Pagina { get; init; } = Math.Max(1, Pagina);
    public int RecordsPorPagina { get; init; } =
        Math.Clamp(RecordsPorPagina, 1, cantidadMaximaRecordsPorPagina);
}