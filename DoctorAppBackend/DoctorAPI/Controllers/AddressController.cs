using BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.DTOS;
using System.Net;

namespace DoctorAPI.Controllers
{
    public class AddressController : BaseApiController
    {
        private readonly IAddressService _addressService;
        private ApiResponse _response;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
            _response = new ApiResponse();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                _response.Result = await _addressService.GetAddressListAsync();
                _response.IsSuccesfuly = true;
                _response.StatusCode = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {

                _response.IsSuccesfuly = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.Message = ex.Message;
            }
            return Ok(_response);
        }
        [HttpPost]
        public async Task<IActionResult> Create(AddressDTO  addressDTO)
        {
            try
            {
                var createdAddress =  await _addressService.AddAddressDTO(addressDTO);

                _response.IsSuccesfuly = true;
                _response.StatusCode = HttpStatusCode.Created;
                _response.Result = createdAddress.Id; // Aquí se asigna el ID de la dirección creada al result
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
        public async Task<IActionResult> Update(AddressDTO addressDTO)
        {
            try
            {
                 await _addressService.Update(addressDTO);
                _response.IsSuccesfuly = true;
                _response.StatusCode = HttpStatusCode.OK;
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
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _addressService.Delete(id);
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
    }
}
