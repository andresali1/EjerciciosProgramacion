using System.ComponentModel;
using System.Linq.Dynamic.Core;
using AutoMapper;
using BibliotecaApi.Data;
using BibliotecaApi.DTOs;
using BibliotecaApi.Entities;
using BibliotecaApi.Services;
using BibliotecaApi.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("api/autores")]
[Authorize(Policy = "esadmin")]
public class AutoresController : ControllerBase
{
    private readonly ApplicationDbContext context;
    private readonly IMapper mapper;
    private readonly IAlmacenadorArchivos almacenadorArchivos;
    private readonly ILogger<AutoresController> logger;
    private readonly IOutputCacheStore outputCacheStore;
    private const string contenedor = "autores";
    private const string cache = "autores-obtener";

    public AutoresController(
        ApplicationDbContext context,
        IMapper mapper,
        IAlmacenadorArchivos almacenadorArchivos,
        ILogger<AutoresController> logger,
        IOutputCacheStore outputCacheStore
    )
    {
        this.context = context;
        this.mapper = mapper;
        this.almacenadorArchivos = almacenadorArchivos;
        this.logger = logger;
        this.outputCacheStore = outputCacheStore;
    }

    [HttpGet]
    [AllowAnonymous]
    [OutputCache(Tags = [cache])]
    public async Task<IEnumerable<AutorDto>> Get([FromQuery] PaginacionDto paginacionDto)
    {
        var queryable = context.Autores.AsQueryable();
        await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);

        var autores = await queryable
            .OrderBy(a => a.Nombre)
            .Paginar(paginacionDto)
            .ToListAsync();

        return mapper.Map<IEnumerable<AutorDto>>(autores);
    }

    [HttpGet("{id:int}", Name = "ObtenerAutor")]
    [AllowAnonymous]
    [EndpointSummary("Obtiene autor por Id")]
    [EndpointDescription("Obtiene un autor por su Id, obtiene sus libros. Si el autor no existe devuelve un 404")]
    [ProducesResponseType<AutorConLibrosDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [OutputCache(Tags = [cache])]
    public async Task<ActionResult<AutorConLibrosDto>> GetById([Description("El id del autor")] int id)
    {
        var autor = await context.Autores
            .Include(a => a.Libros)
                .ThenInclude(al => al.Libro)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (autor is null)
        {
            return NotFound();
        }

        return mapper.Map<AutorConLibrosDto>(autor);
    }

    [HttpGet("filtrar")]
    [AllowAnonymous]
    public async Task<ActionResult> Filtrar([FromQuery] AutorFiltroDto autorFiltroDto)
    {
        var queryable = context.Autores.AsQueryable();

        if (!string.IsNullOrEmpty(autorFiltroDto.Nombre))
        {
            queryable = queryable.Where(x => x.Nombre.Contains(autorFiltroDto.Nombre));
        }

        if (!string.IsNullOrEmpty(autorFiltroDto.Apellidos))
        {
            queryable = queryable.Where(x => x.Apellidos.Contains(autorFiltroDto.Apellidos));
        }

        if (autorFiltroDto.IncluirLibros)
        {
            queryable = queryable.Include(x => x.Libros).ThenInclude(x => x.Libro);
        }

        if (autorFiltroDto.TieneFoto.HasValue)
        {
            if (autorFiltroDto.TieneFoto.Value)
            {
                queryable = queryable.Where(x => x.Foto != null);
            }
            else
            {
                queryable = queryable.Where(x => x.Foto == null);
            }
        }

        if (autorFiltroDto.TieneLibros.HasValue)
        {
            if (autorFiltroDto.TieneLibros.Value)
            {
                queryable = queryable.Where(x => x.Libros.Any());
            }
            else
            {
                queryable = queryable.Where(x => !x.Libros.Any());
            }
        }

        if (!string.IsNullOrEmpty(autorFiltroDto.TituloLibro))
        {
            queryable = queryable
                .Where(x => x.Libros
                    .Any(l => l.Libro!.Titulo
                        .Contains(autorFiltroDto.TituloLibro!)));
        }

        if (!string.IsNullOrEmpty(autorFiltroDto.CampoOrdenar))
        {
            var tipoOrden = autorFiltroDto.OrdenAscendente ? "ascending" : "descending";

            try
            {
                queryable = queryable.OrderBy($"{autorFiltroDto.CampoOrdenar} {tipoOrden}");
            }
            catch (Exception ex)
            {
                queryable = queryable.OrderBy(x => x.Nombre);
                logger.LogError(ex.Message, ex);
            }
        }
        else
        {
            queryable = queryable.OrderBy(x => x.Nombre);
        }

        var autores = await queryable
            .Paginar(autorFiltroDto.PaginacionDto)
            .ToListAsync();

        if (autorFiltroDto.IncluirLibros)
        {
            var autoresDto = mapper.Map<IEnumerable<AutorConLibrosDto>>(autores);
            return Ok(autoresDto);
        }
        else
        {
            var autoresDto = mapper.Map<IEnumerable<AutorDto>>(autores);
            return Ok(autoresDto);
        }
    }

    [HttpPost]
    public async Task<ActionResult> Post(AutorCreacionDto autorCreacionDto)
    {
        var autor = mapper.Map<Autor>(autorCreacionDto);
        context.Add(autor);
        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);
        return CreatedAtRoute("ObtenerAutor", new { id = autor.Id }, mapper.Map<AutorDto>(autor));
    }

    [HttpPost("con-foto")]
    public async Task<ActionResult> PostConFoto([FromForm] AutorCreacionConFotoDto autorCreacionConFotoDto)
    {
        var autor = mapper.Map<Autor>(autorCreacionConFotoDto);
        if (autorCreacionConFotoDto.Foto is not null)
        {
            var url = await almacenadorArchivos.Almacenar(contenedor, autorCreacionConFotoDto.Foto);
            autor.Foto = url;
        }


        context.Add(autor);
        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);
        return CreatedAtRoute("ObtenerAutor", new { id = autor.Id }, mapper.Map<AutorDto>(autor));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, [FromForm] AutorCreacionConFotoDto autorCreacionConFotoDto)
    {
        var existe = await context.Autores.AnyAsync(a => a.Id == id);

        if (!existe)
        {
            return NotFound();
        }

        var autor = mapper.Map<Autor>(autorCreacionConFotoDto);
        autor.Id = id;

        var fotoActual = await context.Autores
                .Where(a => a.Id == id)
                .Select(a => a.Foto)
                .FirstAsync();

        if (autorCreacionConFotoDto.Foto is not null)
        {
            var url = await almacenadorArchivos.Editar(fotoActual, contenedor, autorCreacionConFotoDto.Foto);
            autor.Foto = url;
        }
        else
        {
            if (!string.IsNullOrEmpty(fotoActual))
            {
                autor.Foto = fotoActual;
            }
        }

        context.Update(autor);
        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);
        return NoContent();
    }

    [HttpPatch("{id:int}")]
    public async Task<ActionResult> Patch(int id, JsonPatchDocument<AutorPatchDto> patchDoc)
    {
        if (patchDoc is null)
        {
            return BadRequest();
        }

        var autorDb = await context.Autores.FirstOrDefaultAsync(a => a.Id == id);

        if (autorDb is null)
        {
            return NotFound();
        }

        var autorPatchDto = mapper.Map<AutorPatchDto>(autorDb);

        patchDoc.ApplyTo(autorPatchDto, ModelState);

        var esValido = TryValidateModel(autorPatchDto);

        if (!esValido)
        {
            return ValidationProblem();
        }

        mapper.Map(autorPatchDto, autorDb);

        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var autor = await context.Autores.FirstOrDefaultAsync(a => a.Id == id);

        if (autor is null)
        {
            return NotFound();
        }

        context.Remove(autor);
        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);

        if (!string.IsNullOrEmpty(autor.Foto))
        {
            await almacenadorArchivos.Borrar(autor.Foto, contenedor);
        }

        return NoContent();
    }
}