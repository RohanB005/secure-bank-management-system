
using FraudDetectionService.Entities;

namespace FraudDetectionService.AI.Interfaces
{
    public interface IAIExplanationService
    {
        Task<string> GenerateFraudExplanationAsync(
            FraudLog fraudLog,
            CancellationToken cancellationToken = default);
    }
}

