namespace DoctorAPI.Errors
{
    public class ApiErrorResponse
    {
        public ApiErrorResponse(int statusCode, string message= null)
        {
            StatusCode = statusCode;
            Message = message ?? GetMessageStatusCode(statusCode);
        }


        public int StatusCode { get; set; }
        public string Message { get; set; }


        private string GetMessageStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "an invalid request was made",
                401=> "You are not Authoried to this recurse",
                402 => "Record not Found",
                500 =>  "Internal Error Server",
                _=> null
            };
        }

    }
}
