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


            CreateMap<Medic, MedicDTO>()
                .ForMember(d => d.Status, m => m.MapFrom(o => o.Status ? 1 : 0))
                .ForMember(d => d.SpecialityName, m => m.MapFrom(o => o.Speciality.Name))
                .ForMember(d => d.AddressName, m => m.MapFrom(o => o.Address.NameStreet))
                .ForMember(d => d.NumberStreet, m => m.MapFrom(o => o.Address.Number))
                .ForMember(d=>d.NameStreet,m=>m.MapFrom(o=>o.Address.NameStreet))   
                .ForMember(d => d.ZipCode, m => m.MapFrom(o => o.Address.ZipCode))
                .ForMember(d => d.Description, m => m.MapFrom(o => o.Address.Description));

            // Inverse MedicDto to Medic
            CreateMap<MedicDTO, Medic>()
                .ForMember(d => d.Status, m => m.MapFrom(o => o.Status == 1))
                .ForMember(d => d.Address, opt => opt.Ignore()) 
                .ForMember(d => d.Address, opt => opt.MapFrom(src => new Address
                {
                    NameStreet = src.NameStreet,
                    Number = src.NumberStreet,
                    ZipCode = src.ZipCode,
                    Description = src.Description
                }));

        }
    }
}
