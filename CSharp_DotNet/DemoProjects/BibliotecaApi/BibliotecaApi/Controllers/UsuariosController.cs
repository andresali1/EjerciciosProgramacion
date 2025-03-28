using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using BibliotecaApi.Data;
using BibliotecaApi.DTOs;
using BibliotecaApi.Entities;
using BibliotecaApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("api/usuarios")]
public class UsuariosController : ControllerBase
{
    private readonly UserManager<Usuario> userManager;
    private readonly SignInManager<Usuario> signInManager;
    private readonly IConfiguration configuration;
    private readonly IServicioUsuarios servicioUsuarios;
    private readonly ApplicationDbContext context;
    private readonly IMapper mapper;
    private readonly IOutputCacheStore outputCacheStore;
    private const string cache = "usuarios-obtener";


    public UsuariosController(
        UserManager<Usuario> userManager,
        SignInManager<Usuario> signInManager,
        IConfiguration configuration,
        IServicioUsuarios servicioUsuarios,
        ApplicationDbContext context,
        IMapper mapper,
        IOutputCacheStore outputCacheStore
    )
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
        this.configuration = configuration;
        this.servicioUsuarios = servicioUsuarios;
        this.context = context;
        this.mapper = mapper;
        this.outputCacheStore = outputCacheStore;
    }

    [HttpGet]
    [Authorize(Policy = "esadmin")]
    [OutputCache(Tags = [cache])]
    public async Task<IEnumerable<UsuarioDto>> Get()
    {
        var usuarios = await context.Users.ToListAsync();
        var usuariosDto = mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
        return usuariosDto;
    }

    [HttpPost("registro")]
    public async Task<ActionResult<RespuestaAutenticacionDto>> Registrar(CredencialesUsuarioDto credencialesUsuarioDto)
    {
        var usuario = new Usuario
        {
            UserName = credencialesUsuarioDto.Email,
            Email = credencialesUsuarioDto.Email
        };

        var resultado = await userManager.CreateAsync(usuario, credencialesUsuarioDto.Password!);

        if (resultado.Succeeded)
        {
            await outputCacheStore.EvictByTagAsync(cache, default);
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

    [HttpPut]
    [Authorize]
    public async Task<ActionResult> Put(ActualizarUsuarioDto actualizarUsuarioDto)
    {
        var usuario = await servicioUsuarios.ObtenerUsuario();

        if (usuario is null)
        {
            return NotFound();
        }

        usuario.FechaNacimiento = actualizarUsuarioDto.FechaNacimiento;

        await userManager.UpdateAsync(usuario);
        await outputCacheStore.EvictByTagAsync(cache, default);
        return NoContent();
    }

    [HttpGet("renovar-token")]
    public async Task<ActionResult<RespuestaAutenticacionDto>> RenovarToken()
    {
        var usuario = await servicioUsuarios.ObtenerUsuario();

        if (usuario is null)
        {
            return NotFound();
        }

        var credencialesUsuarioDto = new CredencialesUsuarioDto { Email = usuario.Email! };

        var respuestaAutenticacion = await ConstruirToken(credencialesUsuarioDto);

        return respuestaAutenticacion;
    }

    [HttpPost("hacer-admin")]
    // [Authorize(Policy = "esadmin")]
    public async Task<ActionResult> HacerAdmin(EditarClaimDto editarClaimDto)
    {
        var usuario = await userManager.FindByEmailAsync(editarClaimDto.Email);

        if (usuario is null)
        {
            return NotFound();
        }

        await userManager.AddClaimAsync(usuario, new Claim("esadmin", "true"));
        return NoContent();
    }

    [HttpPost("remover-admin")]
    [Authorize(Policy = "esadmin")]
    public async Task<ActionResult> RemoverAdmin(EditarClaimDto editarClaimDto)
    {
        var usuario = await userManager.FindByEmailAsync(editarClaimDto.Email);

        if (usuario is null)
        {
            return NotFound();
        }

        await userManager.RemoveClaimAsync(usuario, new Claim("esadmin", "true"));
        return NoContent();
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