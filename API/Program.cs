using System.Text;
using API.Middleware;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
                });
            });

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<UserDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var JWTSetting = builder.Configuration.GetSection("JWTSetting");
builder.Services.AddIdentity<AppUser, IdentityRole>(
    opt =>
    {
        opt.Password.RequireDigit = true;
        opt.Password.RequireLowercase = true;
        opt.Password.RequireUppercase = true;
        opt.Password.RequireNonAlphanumeric = true;
        opt.Password.RequiredLength = 4;
    }
)
    .AddEntityFrameworkStores<UserDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt =>
{
    opt.SaveToken = true;
    opt.RequireHttpsMetadata = false;
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTSetting.GetSection("securityKey").Value!)),
        ValidateIssuer = false,
        ValidateAudience = false

    };
});

builder.Services.AddSignalR();
var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("CorsPolicy");

app.MapControllers();
// app.UseHttpsRedirection();
app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();



app.Run();