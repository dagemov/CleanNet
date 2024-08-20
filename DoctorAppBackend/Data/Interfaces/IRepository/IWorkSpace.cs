using Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces.IRepository
{
    public interface IWorkSpace : IDisposable
    {
        IAddressRepository AddressRepository { get; }
        IMedicRepository MedicRepository { get; }
        ISpecialityRepository SpecialityRepository { get; }
        
        Task Save();
    }
}
