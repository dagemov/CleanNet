using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces.IRepository
{
    public interface IAddressRepository : IRepositoryGeneric<Address>
    {
        void Update(Address address);
    }
}
