namespace DoctorAPI.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string messageError, string details)
        {
            StatusCode = statusCode;
            MessageError = messageError;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string MessageError { get; set; }
        public string Details { get; set; }
    }
}
