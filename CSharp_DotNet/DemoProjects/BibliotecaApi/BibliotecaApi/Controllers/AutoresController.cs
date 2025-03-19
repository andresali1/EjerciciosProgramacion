using BibliotecaApi.Data;
using BibliotecaApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("api/autores")]
public class AutoresController : ControllerBase
{
    private readonly ApplicationDbContext context;

    public AutoresController(ApplicationDbContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Autor>> Get()
    {
        return await context.Autores.ToListAsync();
    }

    [HttpGet("{id:int}", Name = "ObtenerAutor")]
    public async Task<ActionResult<Autor>> GetById(int id)
    {
        var autor = await context.Autores
            .Include(a => a.Libros)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (autor is null)
        {
            return NotFound();
        }

        return autor;
    }

    [HttpPost]
    public async Task<ActionResult> Post(Autor autor)
    {
        context.Add(autor);
        await context.SaveChangesAsync();
        return CreatedAtRoute("ObtenerAutor", new { id = autor.Id }, autor);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, Autor autor)
    {
        if (id != autor.Id)
        {
            return BadRequest("Los ids deben coincidir");
        }

        var existe = await context.Autores.AnyAsync(a => a.Id == id);

        if (!existe)
        {
            return NotFound();
        }

        context.Update(autor);
        await context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var borrados = await context.Autores.Where(a => a.Id == id).ExecuteDeleteAsync();

        if (borrados < 1)
        {
            return NotFound();
        }

        return Ok();
    }
}