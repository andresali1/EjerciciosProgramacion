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
                    autor => $"{autor.Nombre} {autor.Apellidos}"
                )
            );

        CreateMap<AutorCreacionDto, Autor>();

        CreateMap<Libro, LibroDto>();

        CreateMap<LibroCreacionDto, Libro>();
    }
}