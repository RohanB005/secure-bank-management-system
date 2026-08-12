package com.bank.account.dto.response;

import java.math.BigDecimal;

import com.bank.account.entity.Account;

public class AccountResponse {

    private Integer accountId;
    private Integer customerId;
    private String accountNumber;
    private String accountType;
    private BigDecimal balance;
    private String branchName;
    private String ifscCode;
    private String status;

    // No-argument constructor
    public AccountResponse() {
    }

    // All-argument constructor
    public AccountResponse(Integer accountId, Integer customerId,
                           String accountNumber, String accountType,
                           BigDecimal balance, String branchName,
                           String ifscCode, String status) {

        this.accountId = accountId;
        this.customerId = customerId;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.branchName = branchName;
        this.ifscCode = ifscCode;
        this.status = status;
    }

    // Getters

    public Integer getAccountId() {
        return accountId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public String getBranchName() {
        return branchName;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public String getStatus() {
        return status;
    }

    // Setters

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Entity -> DTO conversion
    public static AccountResponse fromEntity(Account account) {

        return new AccountResponse(
                account.getAccountId(),
                account.getCustomerId(),
                account.getAccountNumber(),
                account.getAccountType().name(),
                account.getBalance(),
                account.getBranchName(),
                account.getIfscCode(),
                account.getStatus().name()
        );
    }
}