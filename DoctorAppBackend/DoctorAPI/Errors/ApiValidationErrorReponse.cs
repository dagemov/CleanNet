namespace DoctorAPI.Errors
{
    public class ApiValidationErrorReponse : ApiErrorResponse
    {
        public ApiValidationErrorReponse() : base(400)
        {
        }
        public IEnumerable<string> Erros { get; set; }
    }
}
