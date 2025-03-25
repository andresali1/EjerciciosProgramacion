using Microsoft.AspNetCore.Identity;

namespace BibliotecaApi.Entities;

public class Usuario : IdentityUser
{
    public DateTime FechaNacimiento { get; set; }
}