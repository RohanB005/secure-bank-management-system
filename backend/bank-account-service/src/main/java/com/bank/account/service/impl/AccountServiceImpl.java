package com.bank.account.service.impl;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.account.client.AuthServiceClient;
import com.bank.account.dto.request.CreateAccountRequest;
import com.bank.account.dto.request.TransferRequest;
import com.bank.account.dto.request.UpdateAccountRequest;
import com.bank.account.dto.request.UpdateBalanceRequest;
import com.bank.account.dto.response.AccountResponse;
import com.bank.account.dto.response.TransferResponse;
import com.bank.account.entity.Account;
import com.bank.account.exception.InvalidOperationException;
import com.bank.account.exception.ResourceNotFoundException;
import com.bank.account.repository.AccountRepository;
import com.bank.account.service.AccountService;

import jakarta.validation.Valid;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AuthServiceClient authServiceClient;

    private final SecureRandom random = new SecureRandom();

    @Override
    public AccountResponse createAccount(@Valid CreateAccountRequest request) {

        boolean exists = authServiceClient.customerExists(
                request.getCustomerId()
        );

        if (!exists) {
            throw new ResourceNotFoundException(
                    "Customer not found with id: "
                            + request.getCustomerId()
            );
        }

        if (accountRepository.existsByCustomerIdAndAccountType(
                request.getCustomerId(),
                request.getAccountType())) {

            throw new InvalidOperationException(
                    request.getAccountType()
                            + " account already exists for this customer."
            );
        }

        Account account = new Account();

        account.setCustomerId(request.getCustomerId());
        account.setAccountNumber(generateAccountNumber());
        account.setAccountType(request.getAccountType());
        account.setBranchName(request.getBranchName());
        account.setIfscCode(request.getIfscCode());
        account.setBalance(BigDecimal.ZERO);
        account.setStatus(Account.AccountStatus.Active);

        Account saved = accountRepository.save(account);

        return AccountResponse.fromEntity(saved);
    }

    private String generateAccountNumber() {

        String number;

        do {
            number = String.valueOf(
                    100000000000L
                            + random.nextLong(900000000000L)
            );

        } while (accountRepository.existsByAccountNumber(number));

        return number;
    }

    @Override
    public AccountResponse getAccount(Integer accountId) {

        return AccountResponse.fromEntity(
                findAccountOrThrow(accountId)
        );
    }

    private Account findAccountOrThrow(Integer accountId) {

        return accountRepository.findById(accountId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Account not found with id: "
                                        + accountId
                        )
                );
    }

    @Override
    public List<AccountResponse> getAccountByCustomer(
            Integer customerId) {

        return accountRepository.findByCustomerId(customerId)
                .stream()
                .map(AccountResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public AccountResponse updateAccount(
            Integer accountId,
            UpdateAccountRequest request) {

        Account account = findAccountOrThrow(accountId);

        if (request.getAccountType() != null) {
            account.setAccountType(request.getAccountType());
        }

        Account updated = accountRepository.save(account);

        return AccountResponse.fromEntity(updated);
    }

    @Override
    public AccountResponse updateBalance(
            Integer accountId,
            UpdateBalanceRequest request) {

        Account account = findAccountOrThrow(accountId);

        if (account.getStatus() != Account.AccountStatus.Active) {
            throw new InvalidOperationException(
                    "Account is not active"
            );
        }

        if (request.getBalance() == null) {
            throw new InvalidOperationException(
                    "Balance cannot be null"
            );
        }

        if (request.getBalance().compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidOperationException(
                    "Balance cannot be negative"
            );
        }

        account.setBalance(request.getBalance());

        Account updated = accountRepository.save(account);

        return AccountResponse.fromEntity(updated);
    }

    @Override
    public AccountResponse closeAccount(Integer accountId) {

        Account account = findAccountOrThrow(accountId);

        if (account.getBalance().compareTo(BigDecimal.ZERO) != 0) {

            throw new InvalidOperationException(
                    "Please withdraw or transfer the remaining balance "
                            + "before closing the account. Current balance: ₹"
                            + account.getBalance()
            );
        }

        account.setStatus(Account.AccountStatus.Closed);

        Account updated = accountRepository.save(account);

        return AccountResponse.fromEntity(updated);
    }

    @Override
    @Transactional
    public TransferResponse transfer(TransferRequest request) {

        if (request.getAmount() == null) {
            throw new InvalidOperationException(
                    "Transfer amount cannot be null"
            );
        }

        if (request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidOperationException(
                    "Transfer amount must be greater than zero"
            );
        }

        if (request.getFromAccountId() == null
                || request.getToAccountId() == null) {

            throw new InvalidOperationException(
                    "Sender and receiver account IDs are required"
            );
        }

        if (request.getFromAccountId()
                .equals(request.getToAccountId())) {

            throw new InvalidOperationException(
                    "Sender and receiver accounts cannot be the same"
            );
        }

        Account sender = accountRepository.findById(
                request.getFromAccountId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Sender account not found with id: "
                                + request.getFromAccountId()
                )
        );

        Account receiver = accountRepository.findById(
                request.getToAccountId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Receiver account not found with id: "
                                + request.getToAccountId()
                )
        );

        if (sender.getStatus() != Account.AccountStatus.Active) {
            throw new InvalidOperationException(
                    "Sender account is not active"
            );
        }

        if (receiver.getStatus() != Account.AccountStatus.Active) {
            throw new InvalidOperationException(
                    "Receiver account is not active"
            );
        }

        if (sender.getBalance().compareTo(
                request.getAmount()) < 0) {

            throw new InvalidOperationException(
                    "Insufficient balance"
            );
        }

        sender.setBalance(
                sender.getBalance()
                        .subtract(request.getAmount())
        );

        receiver.setBalance(
                receiver.getBalance()
                        .add(request.getAmount())
        );

        accountRepository.save(sender);
        accountRepository.save(receiver);

        return new TransferResponse(
                sender.getAccountId(),
                receiver.getAccountId(),
                sender.getBalance(),
                receiver.getBalance(),
                "SUCCESS"
        );
    }
}