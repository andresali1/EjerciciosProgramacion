using AutoMapper;
using BibliotecaApi.Data;
using BibliotecaApi.DTOs;
using BibliotecaApi.Entities;
using BibliotecaApi.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("/api/libros")]
[Authorize(Policy = "esadmin")]
public class LibrosController : ControllerBase
{
    private readonly ApplicationDbContext context;
    private readonly IMapper mapper;
    private readonly IOutputCacheStore outputCacheStore;
    private const string cache = "libros-obtener";

    public LibrosController(
        ApplicationDbContext context,
        IMapper mapper,
        IOutputCacheStore outputCacheStore
    )
    {
        this.context = context;
        this.mapper = mapper;
        this.outputCacheStore = outputCacheStore;
    }

    [HttpGet]
    [AllowAnonymous]
    [OutputCache(Tags = [cache])]
    public async Task<IEnumerable<LibroDto>> Get([FromQuery] PaginacionDto paginacionDto)
    {
        var queryable = context.Libros.AsQueryable();
        await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);

        var libros = await queryable
            .OrderBy(l => l.Titulo)
            .Paginar(paginacionDto)
            .ToListAsync();

        var librosDto = mapper.Map<IEnumerable<LibroDto>>(libros);
        return librosDto;
    }

    [HttpGet("{id:int}", Name = "ObtenerLibro")]
    [AllowAnonymous]
    [OutputCache(Tags = [cache])]
    public async Task<ActionResult<LibroConAutoresDto>> GetById(int id)
    {
        var libro = await context.Libros
            .Include(l => l.Autores)
                .ThenInclude(al => al.Autor)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (libro is null)
        {
            return NotFound();
        }

        var libroDto = mapper.Map<LibroConAutoresDto>(libro);

        return libroDto;
    }

    [HttpPost]
    public async Task<ActionResult> Post(LibroCreacionDto libroCreacionDto)
    {
        if (libroCreacionDto.AutoresIds is null || libroCreacionDto.AutoresIds.Count == 0)
        {
            ModelState.AddModelError(nameof(libroCreacionDto.AutoresIds),
                "No se puede crear un libro sin autores");

            return ValidationProblem();
        }

        var autoresIdsExisten = await context.Autores
            .Where(a => libroCreacionDto.AutoresIds.Contains(a.Id))
            .Select(a => a.Id).ToListAsync();

        if (autoresIdsExisten.Count != libroCreacionDto.AutoresIds.Count)
        {
            var autoresNoexisten = libroCreacionDto.AutoresIds.Except(autoresIdsExisten);
            var autoresNoExistenString = string.Join(",", autoresNoexisten);
            var mensajeError = $"Los siguientes autores no existen: {autoresNoExistenString}";
            ModelState.AddModelError(nameof(libroCreacionDto.AutoresIds), mensajeError);
            return ValidationProblem();
        }

        var libro = mapper.Map<Libro>(libroCreacionDto);
        AsignarOrdenAutores(libro);

        context.Add(libro);
        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);

        var libroDto = mapper.Map<LibroDto>(libro);

        return CreatedAtRoute("ObtenerLibro", new { id = libro.Id }, libroDto);
    }

    private void AsignarOrdenAutores(Libro libro)
    {
        if (libro.Autores is not null)
        {
            for (int i = 0; i < libro.Autores.Count; i++)
            {
                libro.Autores[i].Orden = i;
            }
        }
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, LibroCreacionDto libroCreacionDto)
    {
        if (libroCreacionDto.AutoresIds is null || libroCreacionDto.AutoresIds.Count == 0)
        {
            ModelState.AddModelError(nameof(libroCreacionDto.AutoresIds),
                "No se puede crear un libro sin autores");

            return ValidationProblem();
        }

        var autoresIdsExisten = await context.Autores
            .Where(a => libroCreacionDto.AutoresIds.Contains(a.Id))
            .Select(a => a.Id).ToListAsync();

        if (autoresIdsExisten.Count != libroCreacionDto.AutoresIds.Count)
        {
            var autoresNoexisten = libroCreacionDto.AutoresIds.Except(autoresIdsExisten);
            var autoresNoExistenString = string.Join(",", autoresNoexisten);
            var mensajeError = $"Los siguientes autores no existen: {autoresNoExistenString}";
            ModelState.AddModelError(nameof(libroCreacionDto.AutoresIds), mensajeError);
            return ValidationProblem();
        }

        var libroDb = await context.Libros
            .Include(l => l.Autores)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (libroDb is null)
        {
            return NotFound();
        }

        libroDb = mapper.Map(libroCreacionDto, libroDb);
        AsignarOrdenAutores(libroDb);

        await context.SaveChangesAsync();
        await outputCacheStore.EvictByTagAsync(cache, default);
        return NoContent();
    }

    // [HttpDelete("{id:int}")]
    // public async Task<ActionResult> Delete(int id)
    // {
    //     var eliminados = await context.Libros.Where(l => l.Id == id).ExecuteDeleteAsync();

    //     if (eliminados < 1)
    //     {
    //         return NotFound();
    //     }

    //     return NoContent();
    // }
}