using System.Text.Json.Serialization;
using BibliotecaApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Área de Servicios
builder.Services.AddAutoMapper(typeof(Program));

builder.Services
    .AddControllers()
    .AddJsonOptions(
        opciones => opciones.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<ApplicationDbContext>(opciones =>
    opciones.UseSqlServer("name=DefaultConnection"));

var app = builder.Build();

// Área de Middlewares
app.MapControllers();

app.Run();
