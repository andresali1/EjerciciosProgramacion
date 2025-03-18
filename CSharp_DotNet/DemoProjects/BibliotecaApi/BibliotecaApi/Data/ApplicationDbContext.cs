using BibliotecaApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    public DbSet<Autor> Autores { get; set; }
    public DbSet<Libro> Libros { get; set; }
}