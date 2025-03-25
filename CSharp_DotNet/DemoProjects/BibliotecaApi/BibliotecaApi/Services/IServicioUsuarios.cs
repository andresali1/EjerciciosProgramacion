using BibliotecaApi.Entities;
using Microsoft.AspNetCore.Identity;

namespace BibliotecaApi.Services;

public interface IServicioUsuarios
{
    Task<Usuario?> ObtenerUsuario();
}