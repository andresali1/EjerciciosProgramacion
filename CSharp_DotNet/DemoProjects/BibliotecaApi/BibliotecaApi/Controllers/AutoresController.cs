using AutoMapper;
using BibliotecaApi.Data;
using BibliotecaApi.DTOs;
using BibliotecaApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("api/autores")]
public class AutoresController : ControllerBase
{
    private readonly ApplicationDbContext context;
    private readonly IMapper mapper;

    public AutoresController(ApplicationDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    [HttpGet]
    public async Task<IEnumerable<AutorDto>> Get()
    {
        var autores = await context.Autores.ToListAsync();
        return mapper.Map<IEnumerable<AutorDto>>(autores);
    }

    [HttpGet("{id:int}", Name = "ObtenerAutor")]
    public async Task<ActionResult<AutorDto>> GetById(int id)
    {
        var autor = await context.Autores
            .Include(a => a.Libros)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (autor is null)
        {
            return NotFound();
        }

        return mapper.Map<AutorDto>(autor);
    }

    [HttpPost]
    public async Task<ActionResult> Post(AutorCreacionDto autorCreacionDto)
    {
        var autor = mapper.Map<Autor>(autorCreacionDto);
        context.Add(autor);
        await context.SaveChangesAsync();
        return CreatedAtRoute("ObtenerAutor", new { id = autor.Id }, mapper.Map<AutorDto>(autor));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, AutorCreacionDto autorCreacionDto)
    {
        var existe = await context.Autores.AnyAsync(a => a.Id == id);

        if (!existe)
        {
            return NotFound();
        }

        var autor = mapper.Map<Autor>(autorCreacionDto);
        autor.Id = id;

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