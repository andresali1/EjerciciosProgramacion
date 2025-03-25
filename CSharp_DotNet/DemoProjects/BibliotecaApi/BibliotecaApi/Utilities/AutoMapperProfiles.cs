using AutoMapper;
using BibliotecaApi.DTOs;
using BibliotecaApi.Entities;

namespace BibliotecaApi.Utilities;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Autor, AutorDto>()
            .ForMember(
                dto => dto.NombreCompleto,
                config => config.MapFrom(
                    autor => MapearNombreApellidoAutor(autor)
                )
            );

        CreateMap<Autor, AutorConLibrosDto>()
            .ForMember(
                dto => dto.NombreCompleto,
                config => config.MapFrom(
                    autor => MapearNombreApellidoAutor(autor)
                )
            );

        CreateMap<AutorCreacionDto, Autor>();
        CreateMap<Autor, AutorPatchDto>().ReverseMap();

        CreateMap<AutorLibro, LibroDto>()
            .ForMember(dto => dto.Id,
            config => config.MapFrom(
                ent => ent.LibroId
            ))
            .ForMember(dto => dto.Titulo,
            config => config.MapFrom(
                ent => ent.Libro!.Titulo
            ));

        CreateMap<Libro, LibroDto>();

        CreateMap<Libro, LibroConAutoresDto>();
        CreateMap<AutorLibro, AutorDto>()
            .ForMember(dto => dto.Id,
            config => config.MapFrom(
                ent => ent.AutorId
            ))
            .ForMember(dto => dto.NombreCompleto,
            config => config.MapFrom(
                ent => MapearNombreApellidoAutor(ent.Autor!)
            ));

        CreateMap<LibroCreacionDto, AutorLibro>()
            .ForMember(ent => ent.Libro,
            config => config.MapFrom(
                dto => new Libro { Titulo = dto.Titulo }
            ));

        CreateMap<LibroCreacionDto, Libro>()
            .ForMember(entidad => entidad.Autores,
            config => config.MapFrom(
                dto => dto.AutoresIds.Select(id => new AutorLibro { AutorId = id })
            ));

        CreateMap<ComentarioCreacionDto, Comentario>();
        CreateMap<Comentario, ComentarioDto>()
            .ForMember(dto => dto.UsuarioEmail,
            config => config.MapFrom(ent => ent.Usuario!.Email));
        CreateMap<ComentarioPatchDto, Comentario>().ReverseMap();
    }

    private string MapearNombreApellidoAutor(Autor autor) => $"{autor.Nombre} {autor.Apellidos}";
}