﻿using AutoMapper;
using BusinessLogic.Services.Interfaces;
using Data.Interfaces.IRepository;
using Models.DTOS;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class MedicService : IMedicService
    {
        private readonly IMapper _mapper;
        private readonly IWorkSpace _workSpace;

        public MedicService(IMapper mapper, IWorkSpace workSpace)
        {
           _mapper = mapper;
           _workSpace = workSpace;
        }

        public async Task<MedicDTO> Add(MedicDTO dto)
        {
            try
            {
                Address address = await _workSpace.AddressRepository.GetAsync(a => a.Id == dto.AddresId);

                if (address == null)
                {
                    address = new Address
                    {
                        NameStreet = dto.NameStreet,
                        Number = dto.NumberStreet,
                        ZipCode = dto.ZipCode,
                        Description = dto.Description,
                    };
                    await _workSpace.AddressRepository.Add(address);
                    await _workSpace.Save();
                }


                Medic medic = new Medic()
                {
                    AddresId = address.Id,
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    MiddleName = dto.MiddleName,
                    Phone = dto.Phone,
                    Gender = dto.Gender,
                    Status = dto.Status == 1 ? true : false,
                    SpecialityId = dto.SpecialityId,
                    Created = DateTime.Now,
                    Updated = DateTime.Now,
                };
                await _workSpace.MedicRepository.Add(medic);
                await _workSpace.Save();
                if(medic.Id == 0) throw new TaskCanceledException("Error to created Medic");
                return _mapper.Map<MedicDTO>(medic);
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
                var medicDb = await _workSpace.MedicRepository.GetAsync
               (
                    m => m.Id == id,
                    includeProperties: "Address.Medics"  // Incluir la navegación correcta
                );

                if (medicDb == null) throw new TaskCanceledException("The medic does not exist");

                var addressId = medicDb.AddresId;
                _workSpace.MedicRepository.Delete(medicDb);
                await _workSpace.Save();

                var address = await _workSpace.AddressRepository.GetAsync(a => a.Id == addressId);
                if (address != null && !address.Medics.Any())
                {
                    _workSpace.AddressRepository.Delete(address);
                    await _workSpace.Save();
                }              
            }
            catch (Exception)
            {
                throw;
            }

        }

        public async Task<IEnumerable<MedicDTO>> GetAllMedicsDTO()
        {
            try
            {
                var list = await _workSpace.MedicRepository.GetAllAsync(
                        orderBy: e=>e.OrderBy(e=>e.LastName)
                    );
                return _mapper.Map<IEnumerable<MedicDTO>>(list);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task Update(MedicDTO dto)
        {
            try
            {
                var medicDb = await _workSpace.MedicRepository.GetAsync(m=>m.Id == dto.Id);

                if(medicDb==null) throw new TaskCanceledException("Record not found or not exist , ples check out");

                medicDb.AddresId = dto.AddresId;
                medicDb.FirstName = dto.FirstName;
                medicDb.MiddleName = dto.MiddleName;
                medicDb.LastName = dto.LastName;
                medicDb.Gender = dto.Gender;
                medicDb.Phone = dto.Phone;
                medicDb.Status = dto.Status == 1 ? true : false;
                medicDb.SpecialityId = dto.SpecialityId;
                
                _workSpace.MedicRepository.Update(medicDb);
                await _workSpace.Save();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}