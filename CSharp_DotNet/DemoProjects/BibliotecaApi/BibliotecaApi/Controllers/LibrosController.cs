using BibliotecaApi.Data;
using BibliotecaApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("/api/libros")]
public class LibrosController : ControllerBase
{
    private readonly ApplicationDbContext context;

    public LibrosController(ApplicationDbContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Libro>> Get()
    {
        return await context.Libros.ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Libro>> GetById(int id)
    {
        var libro = await context.Libros
            .Include(l => l.Autor)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (libro is null)
        {
            return NotFound();
        }

        return libro;
    }

    [HttpPost]
    public async Task<ActionResult> Post(Libro libro)
    {
        var existeAutor = await context.Autores.AnyAsync(a => a.Id == libro.AutorId);

        if (!existeAutor)
        {
            return BadRequest($"El autor de id {libro.AutorId} no existe");
        }

        context.Add(libro);
        await context.SaveChangesAsync();
        return Ok();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, Libro libro)
    {
        if (id != libro.Id)
        {
            return BadRequest("Los ids deben coincidir");
        }

        var existe = await context.Libros.AnyAsync(l => l.Id == id);

        if (!existe)
        {
            return NotFound();
        }

        context.Update(libro);
        await context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var eliminados = await context.Libros.Where(l => l.Id == id).ExecuteDeleteAsync();

        if (eliminados < 1)
        {
            return NotFound();
        }

        return Ok();
    }
}