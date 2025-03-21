using BibliotecaApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Autor>().Property(x => x.Nombre).HasMaxLength(100);
        modelBuilder.Entity<Libro>().Property(x => x.Titulo).HasMaxLength(150);
    }

    public DbSet<Autor> Autores { get; set; }
    public DbSet<Libro> Libros { get; set; }
    public DbSet<Comentario> Comentarios { get; set; }
}