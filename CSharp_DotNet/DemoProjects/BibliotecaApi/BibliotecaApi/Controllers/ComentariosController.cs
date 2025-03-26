using AutoMapper;
using BibliotecaApi.Data;
using BibliotecaApi.DTOs;
using BibliotecaApi.Entities;
using BibliotecaApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("/api/libros/{libroId:int}/comentarios")]
[Authorize]
public class ComentariosController : ControllerBase
{
    private readonly ApplicationDbContext context;
    private readonly IMapper mapper;
    private readonly IServicioUsuarios servicioUsuarios;
    private readonly IOutputCacheStore outputCacheStore;
    private const string cache = "comentarios-obtener";

    public ComentariosController(
        ApplicationDbContext context,
        IMapper mapper,
        IServicioUsuarios servicioUsuarios,
        IOutputCacheStore outputCacheStore
    )
    {
        this.context = context;
        this.mapper = mapper;
        this.servicioUsuarios = servicioUsuarios;
        this.outputCacheStore = outputCacheStore;
    }

    [HttpGet]
    [AllowAnonymous]
    [OutputCache(Tags = [cache])]
    public async Task<ActionResult<List<ComentarioDto>>> Get(int libroId)
    {
        var existeLibro = await context.Libros.AnyAsync(l => l.Id == libroId);

        if (!existeLibro)
        {
            return NotFound();
        }

        var comentarios = await context.Comentarios
            .Include(c => c.Usuario)
            .Where(c => c.LibroId == libroId)
            .OrderByDescending(c => c.FechaPublicacion)
            .ToListAsync();

        return mapper.Map<List<ComentarioDto>>(comentarios);
    }

    [HttpGet("{id}", Name = "ObtenerComentario")]
    [AllowAnonymous]
    [OutputCache(Tags = [cache])]
    public async Task<ActionResult<ComentarioDto>> GetById(Guid id)
    {
        var comentario = await context.Comentarios
            .Include(c => c.Usuario)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (comentario is null)
        {
            return NotFound();
        }

        return mapper.Map<ComentarioDto>(comentario);
    }

    [HttpPost]
    public async Task<ActionResult> Post(int libroId, ComentarioCreacionDto comentarioCreacionDto)
    {
        var existeLibro = await context.Libros.AnyAsync(l => l.Id == libroId);

        if (!existeLibro)
        {
            return NotFound();
        }

        var usuario = await servicioUsuarios.ObtenerUsuario();

        if (usuario is null)
        {
            return NotFound();
        }

        var comentario = mapper.Map<Comentario>(comentarioCreacionDto);
        comentario.LibroId = libroId;
        comentario.FechaPublicacion = DateTime.UtcNow;
        comentario.UsuarioId = usuario.Id;

        context.Add(comentario);
        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);
        return CreatedAtRoute("ObtenerComentario", new { id = comentario.Id, libroId }, mapper.Map<ComentarioDto>(comentario));
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> Patch(Guid id, int libroId, JsonPatchDocument<ComentarioPatchDto> patchDoc)
    {
        if (patchDoc is null)
        {
            return BadRequest();
        }

        var existeLibro = await context.Libros.AnyAsync(l => l.Id == libroId);

        if (!existeLibro)
        {
            return NotFound();
        }

        var usuario = await servicioUsuarios.ObtenerUsuario();

        if (usuario is null)
        {
            return NotFound();
        }

        var comentarioDb = await context.Comentarios.FirstOrDefaultAsync(a => a.Id == id);

        if (comentarioDb is null)
        {
            return NotFound();
        }

        if (comentarioDb.UsuarioId != usuario.Id)
        {
            return Forbid();
        }

        var comentarioPatchDto = mapper.Map<ComentarioPatchDto>(comentarioDb);

        patchDoc.ApplyTo(comentarioPatchDto, ModelState);

        var esValido = TryValidateModel(comentarioPatchDto);

        if (!esValido)
        {
            return ValidationProblem();
        }

        mapper.Map(comentarioPatchDto, comentarioDb);

        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id, int libroId)
    {
        var existeLibro = await context.Libros.AnyAsync(l => l.Id == libroId);

        if (!existeLibro)
        {
            return NotFound();
        }

        var usuario = await servicioUsuarios.ObtenerUsuario();

        if (usuario is null)
        {
            return NotFound();
        }

        var comentarioDb = await context.Comentarios.FirstOrDefaultAsync(c => c.Id == id);

        if (comentarioDb is null)
        {
            return NotFound();
        }

        if (comentarioDb.UsuarioId != usuario.Id)
        {
            return Forbid();
        }

        comentarioDb.EstaBorrado = true;
        context.Update(comentarioDb);
        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);

        return NoContent();
    }
}