using Models.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services.Interfaces
{
    public interface IMedicService
    {
        Task<IEnumerable<MedicDTO>> GetAllMedicsDTO();
        Task<MedicDTO> Add(MedicDTO dto);
        Task Update(MedicDTO dto);
        Task Delete(int id);
    }
}
