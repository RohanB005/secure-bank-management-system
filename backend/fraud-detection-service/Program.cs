using FraudDetectionService.AI.Clients;
using FraudDetectionService.AI.Interfaces;
using FraudDetectionService.Configuration;
using FraudDetectionService.Data;
using FraudDetectionService.Services;
using FraudDetectionService.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Database
var connectionString = builder.Configuration.GetConnectionString("FraudDb");

builder.Services.AddDbContext<FraudDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    ));

// Gemini Configuration
builder.Services.Configure<GeminiSettings>(
    builder.Configuration.GetSection("Gemini"));

// Gemini HTTP Client
builder.Services.AddHttpClient<IGeminiClient, GeminiClient>();

// AI Services
builder.Services.AddScoped<IAIExplanationService, AIExplanationService>();
builder.Services.AddScoped<IChatAssistantService, ChatAssistantService>();

// Fraud Service
builder.Services.AddScoped<IFraudService, FraudService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS
app.UseCors("AllowFrontend");

// HTTPS redirection disabled for local testing
// app.UseHttpsRedirection();

// Controllers
app.MapControllers();

app.Run();

