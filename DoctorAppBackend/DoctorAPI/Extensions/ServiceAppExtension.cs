using Data.Interfaces;
using Data.Services;
using Data;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using DoctorAPI.Errors;
using Data.Interfaces.IRepository;
using Data.Repository;
using Utilyties;
using BusinessLogic.Services.Interfaces;
using BusinessLogic.Services;

namespace DoctorAPI.Extensions
{
    static class ServiceAppExtension
    {
        public static IServiceCollection AddServiceApp(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            //COnfiguraiton swagger to input tokens with bearer
            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "Input Bearer [Space] Token \r\n\r\n" +
                    "Example : Bearer ejoy***~811411888*",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Scheme = "Bearer"
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                        },
                            Scheme="oauth2",
                            Name ="Bearer",
                            In = ParameterLocation.Header
                     },
                        new List<string>()
                }
            });
        });

            var connectionString = config.GetConnectionString("DefaultConnection");
            services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));

            //service CORS in API , to external connections 
            services.AddCors();

            services.AddScoped<ITokenService, TokenService>();

            services.Configure<ApiBehaviorOptions>(options=>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var erros = actionContext.ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x=> x.Value.Errors)
                    .Select(x=>x.ErrorMessage).ToArray();

                    var errosResponse = new ApiValidationErrorReponse
                    {
                        Erros = erros,
                    };

                    return new BadRequestObjectResult(errosResponse);
                };
            });

            services.AddScoped<IWorkSpace, WorkSpace>();
            services.AddAutoMapper(typeof(MappingProfile));

            services.AddScoped<ISpecialityService, SpecialityService>();
            services.AddScoped<IAddressService, AddressService>();

            return services;

        }
    }

}
