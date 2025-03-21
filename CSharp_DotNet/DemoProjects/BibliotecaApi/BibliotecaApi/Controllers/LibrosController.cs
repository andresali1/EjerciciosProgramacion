using AutoMapper;
using BibliotecaApi.Data;
using BibliotecaApi.DTOs;
using BibliotecaApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("/api/libros")]
public class LibrosController : ControllerBase
{
    private readonly ApplicationDbContext context;
    private readonly IMapper mapper;

    public LibrosController(ApplicationDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    [HttpGet]
    public async Task<IEnumerable<LibroDto>> Get()
    {
        var libros = await context.Libros.ToListAsync();
        var librosDto = mapper.Map<IEnumerable<LibroDto>>(libros);
        return librosDto;
    }

    [HttpGet("{id:int}", Name = "ObtenerLibro")]
    public async Task<ActionResult<LibroConAutorDto>> GetById(int id)
    {
        var libro = await context.Libros
            .Include(l => l.Autor)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (libro is null)
        {
            return NotFound();
        }

        var libroDto = mapper.Map<LibroConAutorDto>(libro);

        return libroDto;
    }

    [HttpPost]
    public async Task<ActionResult> Post(LibroCreacionDto libroCreacionDto)
    {
        var libro = mapper.Map<Libro>(libroCreacionDto);
        var existeAutor = await context.Autores.AnyAsync(a => a.Id == libro.AutorId);

        if (!existeAutor)
        {
            return BadRequest($"El autor de id {libro.AutorId} no existe");
        }

        context.Add(libro);
        await context.SaveChangesAsync();

        var libroDto = mapper.Map<LibroDto>(libro);

        return CreatedAtRoute("ObtenerLibro", new { id = libro.Id }, libroDto);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, LibroCreacionDto libroCreacionDto)
    {
        var existe = await context.Libros.AnyAsync(l => l.Id == id);

        if (!existe)
        {
            return NotFound();
        }

        var libro = mapper.Map<Libro>(libroCreacionDto);
        libro.Id = id;

        context.Update(libro);
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var eliminados = await context.Libros.Where(l => l.Id == id).ExecuteDeleteAsync();

        if (eliminados < 1)
        {
            return NotFound();
        }

        return NoContent();
    }
}