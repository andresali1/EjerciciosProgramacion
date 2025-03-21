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

        CreateMap<Libro, LibroDto>();

        CreateMap<Libro, LibroConAutorDto>()
        .ForMember(
            dto => dto.AutorNombre,
            config => config.MapFrom(ent => MapearNombreApellidoAutor(ent.Autor!))
        );

        CreateMap<LibroCreacionDto, Libro>();
    }

    private string MapearNombreApellidoAutor(Autor autor) => $"{autor.Nombre} {autor.Apellidos}";
}