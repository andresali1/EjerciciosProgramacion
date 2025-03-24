namespace BibliotecaApi.DTOs;

public class RespuestaAutenticacionDto
{
    public required string Token { get; set; }
    public DateTime Expiracion { get; set; }
}