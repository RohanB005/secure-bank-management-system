
using System.Net.Http.Json;
using System.Text.Json;
using FraudDetectionService.AI.Interfaces;
using FraudDetectionService.AI.Models;
using FraudDetectionService.Configuration;
using Microsoft.Extensions.Options;

namespace FraudDetectionService.AI.Clients
{
    public class GeminiClient : IGeminiClient
    {
        private readonly HttpClient _httpClient;
        private readonly GeminiSettings _settings;

        public GeminiClient(
            HttpClient httpClient,
            IOptions<GeminiSettings> options)
        {
            _httpClient = httpClient;
            _settings = options.Value;
        }

        public async Task<string> GenerateContentAsync(
            string prompt,
            CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(prompt))
                throw new ArgumentException(
                    "Prompt cannot be empty.",
                    nameof(prompt));

            if (string.IsNullOrWhiteSpace(_settings.ApiKey))
                throw new InvalidOperationException(
                    "Gemini API key is not configured.");

            // Gemini REST API endpoint
            var url =
                $"https://generativelanguage.googleapis.com/v1beta/models/{_settings.Model}:generateContent?key={_settings.ApiKey}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new
                            {
                                text = prompt
                            }
                        }
                    }
                },
                generationConfig = new
                {
                    temperature = 0.2,
                    maxOutputTokens = 500
                }
            };

            using var response = await _httpClient.PostAsJsonAsync(
                url,
                requestBody,
                cancellationToken);

            var responseContent = await response.Content.ReadAsStringAsync(
                cancellationToken);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException(
                    $"Gemini API request failed. " +
                    $"Status: {(int)response.StatusCode} {response.ReasonPhrase}. " +
                    $"Response: {responseContent}");
            }

            try
            {
                using var jsonDocument =
                    JsonDocument.Parse(responseContent);

                var text =
                    jsonDocument.RootElement
                        .GetProperty("candidates")[0]
                        .GetProperty("content")
                        .GetProperty("parts")[0]
                        .GetProperty("text")
                        .GetString();

                if (string.IsNullOrWhiteSpace(text))
                {
                    throw new InvalidOperationException(
                        "Gemini returned an empty response.");
                }

                return text.Trim();
            }
            catch (JsonException ex)
            {
                throw new InvalidOperationException(
                    "Unable to parse Gemini API response.",
                    ex);
            }
            catch (KeyNotFoundException ex)
            {
                throw new InvalidOperationException(
                    $"Unexpected Gemini API response: {responseContent}",
                    ex);
            }
        }
    }
}

