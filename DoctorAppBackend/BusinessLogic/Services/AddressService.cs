using AutoMapper;
using BusinessLogic.Services.Interfaces;
using Data.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using Models.DTOS;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class AddressService : IAddressService
    {
        private readonly IMapper _mapper;
        private readonly IWorkSpace _workSpace;

        public AddressService(IMapper mapper,IWorkSpace workSpace)
        {
            _mapper = mapper;
            _workSpace = workSpace;
        }

        public async  Task<AddressDTO> AddAddressDTO(AddressDTO addressDTO)
        {
            try
            {
                Address address = new Address()
                {
                    NameStreet = addressDTO.NameStreet,
                    Number = addressDTO.NumberStreet,
                    ZipCode = addressDTO.ZipCode,
                    Description = addressDTO.Description
                };

                await _workSpace.AddressRepository.Add(address);
                await _workSpace.Save();

                if (address.Id == 0)
                {
                    throw new TaskCanceledException("We can't make this record to your address Entity");
                }
                return _mapper.Map<AddressDTO>(address);
            }
            catch (Exception)
            {

                throw;
            }
        }
      

        public async Task Delete(int id)
        {
            try
            {
                var addressDb = await _workSpace.AddressRepository.GetAsync(a => a.Id == id);

                if (addressDb == null)
                {
                    throw new TaskCanceledException("No records found to this Id address");
                }
                _workSpace.AddressRepository.Delete(addressDb);
                await _workSpace.Save();

            }
            catch (DbUpdateConcurrencyException ex)
            {
                
                throw new InvalidOperationException("A concurrency issue occurred while trying to delete the address. Please try again.", ex);
            }

        }

        public async Task<IEnumerable<AddressDTO>> GetAddressListAsync()
        {
            try
            {
                var list = await _workSpace.AddressRepository.GetAllAsync(
                        orderBy : a=>a.OrderBy(filter=>filter.NameStreet)
                    );
               
                return _mapper.Map<IEnumerable<AddressDTO>>(list);
            }
            catch (Exception ex)
            {

                throw new InvalidOperationException("Error to load Address lists" +
                    "", ex);
            }
           
        }

        public async Task Update(AddressDTO addressDTO)
        {
            try
            {
                var addressDb = await _workSpace.AddressRepository.GetAsync(a=>a.Id==addressDTO.Id);

                if (addressDb == null)
                {
                    throw new TaskCanceledException("There aren't records to update , check out the address {ERROR} 401");
                }

                addressDb.NameStreet = addressDTO.NameStreet;
                addressDb.Number = addressDTO.NumberStreet;
                addressDb.ZipCode = addressDTO.ZipCode;
                addressDb.Description = addressDTO.Description;

                _workSpace.AddressRepository.Update(addressDb);
                await _workSpace.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                
                throw new InvalidOperationException("A concurrency issue occurred while trying to update the address. Please try again.", ex);
            }
        }
    }
}
