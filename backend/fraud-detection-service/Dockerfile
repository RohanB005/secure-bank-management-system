FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY FraudDetectionService.csproj .

RUN dotnet restore FraudDetectionService.csproj

COPY . .

RUN dotnet publish FraudDetectionService.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "FraudDetectionService.dll"]
