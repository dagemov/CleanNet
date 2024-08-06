using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DoctorAPI.Extensions
{
    static class ServiceIdentityExtension
    {
        public static IServiceCollection AddServiceIdentity(this IServiceCollection services,IConfiguration configuration)
        {
            //Autitcadion bearer meedelwares
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(o =>
                {
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });
            return services;

        }
    }
}
