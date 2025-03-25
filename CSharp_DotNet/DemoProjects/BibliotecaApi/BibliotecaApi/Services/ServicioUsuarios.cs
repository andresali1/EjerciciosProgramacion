using BibliotecaApi.Entities;
using Microsoft.AspNetCore.Identity;

namespace BibliotecaApi.Services;

public class ServicioUsuarios : IServicioUsuarios
{
    private readonly UserManager<Usuario> userManager;
    private readonly IHttpContextAccessor contextAccessor;

    public ServicioUsuarios(UserManager<Usuario> userManager, IHttpContextAccessor contextAccessor)
    {
        this.userManager = userManager;
        this.contextAccessor = contextAccessor;
    }

    public async Task<Usuario?> ObtenerUsuario()
    {
        var emailClaim = contextAccessor.HttpContext!.User.Claims.Where(x => x.Type == "email").FirstOrDefault();

        if (emailClaim is null)
        {
            return null;
        }

        var email = emailClaim.Value;

        return await userManager.FindByEmailAsync(email);
    }
}