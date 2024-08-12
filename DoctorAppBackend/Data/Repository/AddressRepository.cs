using Data.Interfaces.IRepository;
using Models.DTOS;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class AddressRepository : RepositoryGeneric<Address>,IAddressRepository
    {
        private readonly DataContext _context;

        public AddressRepository(DataContext context) : base(context)
        {
           _context = context;
        }

        public void Update(Address address)
        {
            var addressDb = _context.Address.FirstOrDefault(a=>a.Id == address.Id);

            if (addressDb != null)
            {
                addressDb.Number = address.Number;
                addressDb.NameStreet = address.NameStreet;
                addressDb.ZipCode = address.ZipCode;
                _context.SaveChanges();
            }
        }
    }
}
