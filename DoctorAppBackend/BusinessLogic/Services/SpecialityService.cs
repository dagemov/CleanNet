using AutoMapper;
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
    public class SpecialityService : ISpecialityService
    {
        private readonly IMapper _mapper;
        private readonly IWorkSpace _workSpace;

        public SpecialityService(IMapper mapper,IWorkSpace workSpace)
        {
            _mapper = mapper;
            _workSpace = workSpace;
        }


        public async Task<SpecialityDTO> AddSpecialityDTO(SpecialityDTO specialityDTO)
        {
            try
            {
                Speciality speciality = new Speciality()
                {
                    Name = specialityDTO.Name,
                    Description = specialityDTO.Description,
                    Status = specialityDTO.Status == 1 ? true : false,
                    Created = DateTime.Now,
                    Updated = DateTime.Now,
                };

                await _workSpace.SpecialityRepository.Add(speciality);
                await _workSpace.Save();

                if (speciality.Id == 0)
                {
                    throw new TaskCanceledException("We can't make the record");
                }

                return _mapper.Map<SpecialityDTO>(speciality);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task Delete(int id)
        {
            try
            {
                var specialityDb = await _workSpace.SpecialityRepository.GetAsync(s => s.Id == id);

                if (specialityDb == null)
                {
                    throw new TaskCanceledException("There aren't specialitys with this ID ");
                }

                _workSpace.SpecialityRepository.Delete(specialityDb);
                await _workSpace.Save();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<IEnumerable<SpecialityDTO>> GetSpecialityListAsync()
        {
            try
            {
                var list = await _workSpace.SpecialityRepository.GetAllAsync(
                    orderBy: e=>e.OrderBy(filter =>filter.Name));

                return _mapper.Map<IEnumerable<SpecialityDTO>>(list);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task Update(SpecialityDTO specialityDTO)
        {
            try
            {
                var specialityDb = await _workSpace.SpecialityRepository.GetAsync(s=>s.Id == specialityDTO.Id);

                if (specialityDb == null)
                {
                    throw new TaskCanceledException("There aren't specialitys with this ID ");
                }
                specialityDb.Name = specialityDTO.Name;
                specialityDb.Description = specialityDTO.Description;
                specialityDb.Status = specialityDTO.Status == 1 ? true : false;

                _workSpace.SpecialityRepository.Update(specialityDb);
                await _workSpace.Save();

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
