using System.ComponentModel.DataAnnotations;

namespace BibliotecaApi.DTOs;

public class ComentarioCreacionDto
{
    [Required]
    public required string Cuerpo { get; set; }
}