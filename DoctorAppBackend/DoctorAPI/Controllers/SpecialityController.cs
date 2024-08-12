using BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.DTOS;
using System.Net;

namespace DoctorAPI.Controllers
{
    public class SpecialityController : BaseApiController
    {
        private readonly ISpecialityService _specialityService;
        private ApiResponse _response;

        public SpecialityController(ISpecialityService specialityService)
        {
            _specialityService = specialityService;
            _response = new ApiResponse();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                _response.Result = await _specialityService.GetSpecialityListAsync();
                _response.IsSuccesfuly = true;
                _response.StatusCode = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {

                _response.IsSuccesfuly= false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.Message = ex.Message;
            }
            return Ok(_response);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SpecialityDTO specialityDTO)
        {
            try
            {
                await _specialityService.AddSpecialityDTO(specialityDTO);
                _response.IsSuccesfuly = true;
                _response.StatusCode = HttpStatusCode.Created;
            }
            catch (Exception ex)
            {
                _response.IsSuccesfuly = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.Message = ex.Message;
            }
            return Ok(_response);
        }
        [HttpPut]
        public async Task<IActionResult> Update(SpecialityDTO specialityDTO)
        {
            try
            {
                await _specialityService.Update(specialityDTO);
                _response.IsSuccesfuly = true;
                _response.StatusCode = HttpStatusCode.NoContent;
            }
            catch (Exception ex)
            {
                _response.IsSuccesfuly = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.Message = ex.Message;
            }
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult>Delete(int id)
        {
            try
            {
                await _specialityService.Delete(id);
                _response.IsSuccesfuly = true;
                _response.StatusCode=HttpStatusCode.NoContent;
            }
            catch (Exception ex)
            {
                _response.IsSuccesfuly=false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.Message = ex.Message;
            }

            return Ok(_response);
        }
    }
}
