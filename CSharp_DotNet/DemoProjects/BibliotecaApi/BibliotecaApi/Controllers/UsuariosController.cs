using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BibliotecaApi.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("api/usuarios")]
[Authorize]
public class UsuariosController : ControllerBase
{
    private readonly UserManager<IdentityUser> userManager;
    private readonly SignInManager<IdentityUser> signInManager;
    private readonly IConfiguration configuration;


    public UsuariosController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
        this.configuration = configuration;
    }

    [HttpPost("registro")]
    [AllowAnonymous]
    public async Task<ActionResult<RespuestaAutenticacionDto>> Registrar(CredencialesUsuarioDto credencialesUsuarioDto)
    {
        var usuario = new IdentityUser
        {
            UserName = credencialesUsuarioDto.Email,
            Email = credencialesUsuarioDto.Email
        };

        var resultado = await userManager.CreateAsync(usuario, credencialesUsuarioDto.Password!);

        if (resultado.Succeeded)
        {
            var respuestaAutenticacion = await ConstruirToken(credencialesUsuarioDto);
            return respuestaAutenticacion;
        }
        else
        {
            foreach (var error in resultado.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return ValidationProblem();
        }
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<RespuestaAutenticacionDto>> Login(CredencialesUsuarioDto credencialesUsuarioDto)
    {
        var usuario = await userManager.FindByEmailAsync(credencialesUsuarioDto.Email);

        if (usuario is null)
        {
            return RetornarLoginIncorrecto();
        }

        var resultado = await signInManager.CheckPasswordSignInAsync(usuario, credencialesUsuarioDto.Password!, lockoutOnFailure: false);

        if (resultado.Succeeded)
        {
            return await ConstruirToken(credencialesUsuarioDto);
        }
        else
        {
            return RetornarLoginIncorrecto();
        }
    }

    private ActionResult RetornarLoginIncorrecto()
    {
        ModelState.AddModelError(string.Empty, "Login incorrecto");
        return ValidationProblem();
    }

    private async Task<RespuestaAutenticacionDto> ConstruirToken(CredencialesUsuarioDto credencialesUsuarioDto)
    {
        var claims = new List<Claim>{
            new Claim("email", credencialesUsuarioDto.Email)
        };

        var usuario = await userManager.FindByEmailAsync(credencialesUsuarioDto.Email);
        var claimsDb = await userManager.GetClaimsAsync(usuario!);

        claims.AddRange(claimsDb);

        var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llaveJWT"]!));
        var credenciales = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

        var expiracion = DateTime.UtcNow.AddMonths(1);

        var tokenDeSeguridad = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiracion, signingCredentials: credenciales);

        var token = new JwtSecurityTokenHandler().WriteToken(tokenDeSeguridad);

        return new RespuestaAutenticacionDto
        {
            Token = token,
            Expiracion = expiracion
        };
    }
}