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

            CreateMap<Address, AddressDTO>()
                .ForMember(dest=>dest.NumberStreet,opt=>opt.MapFrom(src=>src.Number)); // pasa cuando tenemos nombres diferentes en el DTO y entity
        }
    }
}
