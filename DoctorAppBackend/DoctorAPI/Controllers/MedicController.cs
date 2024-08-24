using BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.DTOS;
using System.Net;

namespace DoctorAPI.Controllers
{
    public class MedicController : BaseApiController
    {
        private readonly IMedicService _medicService;
        private ApiResponse _response;

        public MedicController(IMedicService medicService)
        {
            _medicService = medicService;
            _response = new ApiResponse();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                _response.Result = await _medicService.GetAllMedicsDTO();
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
        public async Task<IActionResult> Create(MedicDTO modelDTO)
        {
            try
            {
                await _medicService.Add(modelDTO);
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
        public async Task<IActionResult> Update(MedicDTO modelDTO)
        {
            try
            {
                await _medicService.Update(modelDTO);
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
                await _medicService.Delete(id);
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
