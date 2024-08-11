using AutoMapper;
using Models.DTOS;
using Models.Entities;

namespace Utilyties
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Speciality,SpecialityDTO>()
                .ForMember(d=>d.Status, m=>m.MapFrom(o=>o.Status == true ? 1 : 0));
        }
    }
}
