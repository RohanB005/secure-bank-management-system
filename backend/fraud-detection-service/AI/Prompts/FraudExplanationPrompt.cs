using FraudDetectionService.Entities;

namespace FraudDetectionService.AI.Prompts
{
    public static class FraudExplanationPrompt
    {
        public static string Build(FraudLog fraudLog)
        {
            return $"""
You are a Senior Banking Fraud Analyst.

Analyze this potentially fraudulent banking transaction.

Transaction ID: {fraudLog.TransactionId}
Customer ID: {fraudLog.CustomerId}
Account ID: {fraudLog.AccountId}
Amount: ₹{fraudLog.TransactionAmount}
Transaction Type: {fraudLog.TransactionType}

Current City: {fraudLog.CurrentTransactionCity}
Previous City: {fraudLog.PreviousTransactionCity}

Current IP: {fraudLog.ClientIpAddress}
Previous IP: {fraudLog.PreviousIpAddress}

Risk Score: {fraudLog.RiskScore}

Fraud Detection Reasons:
{fraudLog.Reason}

Provide a complete response using EXACTLY this format:

Risk Level: High

Explanation: [Explain in 2-3 complete sentences why this transaction is risky.]

Fraud Indicators:
- [First specific indicator]
- [Second specific indicator]
- [Third indicator if applicable]

Recommendation: [Give one practical recommendation for the bank.]

IMPORTANT:
- Complete all four sections.
- Do not stop after the Risk Level.
- Do not invent information.
- Use only the transaction details and fraud detection reasons provided.
- Do not mention Tor, VPN, proxy, anonymizer, or malicious IP unless explicitly stated in the fraud detection reasons.
- Keep the entire response under 200 words.
""";
        }
    }
}

