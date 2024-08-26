using Models.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services.Interfaces
{
    public interface ISpecialityService
    {
        Task<IEnumerable<SpecialityDTO>> GetSpecialityListAsync();
        Task<IEnumerable<SpecialityDTO>> GetActiveSpecialityListAsync();
        Task<SpecialityDTO> AddSpecialityDTO(SpecialityDTO specialityDTO);
        Task Update(SpecialityDTO specialityDTO);
        Task Delete(int id);
    }
}
