using AutoMapper;
using BibliotecaApi.Data;
using BibliotecaApi.DTOs;
using BibliotecaApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Controllers;

[ApiController]
[Route("api/autores-coleccion")]
[Authorize]
public class AutoresColeccionController : ControllerBase
{
    private readonly ApplicationDbContext context;
    private readonly IMapper mapper;

    public AutoresColeccionController(ApplicationDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    [HttpGet("{ids}", Name = "ObtenerAutoresPorIds")]
    public async Task<ActionResult<List<AutorConLibrosDto>>> Get(string ids)
    {
        var idsColeccion = new List<int>();
        foreach (var id in ids.Split(","))
        {
            if (int.TryParse(id, out int idInt))
            {
                idsColeccion.Add(idInt);
            }
        }

        if (!idsColeccion.Any())
        {
            ModelState.AddModelError(nameof(ids), "Ningún id fue encontrado");
            return ValidationProblem();
        }

        var autores = await context.Autores
                        .Include(a => a.Libros)
                            .ThenInclude(l => l.Libro)
                        .Where(a => idsColeccion.Contains(a.Id))
                        .ToListAsync();

        if (autores.Count != idsColeccion.Count)
        {
            return NotFound();
        }

        var autoresDto = mapper.Map<List<AutorConLibrosDto>>(autores);
        return autoresDto;
    }

    [HttpPost]
    public async Task<ActionResult> Post(IEnumerable<AutorCreacionDto> autoresCreacionDto)
    {
        var autores = mapper.Map<IEnumerable<Autor>>(autoresCreacionDto);
        context.AddRange(autores);
        await context.SaveChangesAsync();

        var autoresDto = mapper.Map<IEnumerable<AutorDto>>(autores);
        var ids = autores.Select(a => a.Id);
        var idsString = string.Join(",", ids);

        return CreatedAtRoute("ObtenerAutoresPorIds", new { ids = idsString }, autoresDto);
    }
}