using PortfolioApi.Models;

namespace PortfolioApi.Services;

public interface IEmailSender
{
    Task SendContactAsync(ContactRequest request, CancellationToken cancellationToken);
}
