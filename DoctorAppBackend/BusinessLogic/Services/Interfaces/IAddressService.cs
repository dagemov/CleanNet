using Models.DTOS;

namespace BusinessLogic.Services.Interfaces
{
    public interface IAddressService
    {
        Task<IEnumerable<AddressDTO>> GetAddressListAsync();
        Task<AddressDTO> AddAddressDTO(AddressDTO addressDTO);
        Task Update(AddressDTO addressDTO);
        Task Delete(int id);
    }
}
