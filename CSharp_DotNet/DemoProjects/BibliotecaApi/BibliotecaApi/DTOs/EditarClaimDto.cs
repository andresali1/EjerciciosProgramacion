using System.ComponentModel.DataAnnotations;

namespace BibliotecaApi.DTOs;

public class EditarClaimDto
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }
}