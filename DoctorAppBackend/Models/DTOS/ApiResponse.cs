using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOS
{
    public class ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; } //200,201,400,401,500
        public bool  IsSuccesfuly { get; set; }
        public string Message { get; set; }
        public object Result { get; set; }
    }
}
