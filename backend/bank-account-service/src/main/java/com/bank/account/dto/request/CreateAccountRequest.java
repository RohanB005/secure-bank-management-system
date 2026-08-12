package com.bank.account.dto.request;

import com.bank.account.entity.Account.AccountType;

import jakarta.validation.constraints.NotNull;

public class CreateAccountRequest {

    @NotNull(message = "customerId is required")
    private Integer customerId;

    @NotNull(message = "accountType is required")
    private AccountType accountType;

    @NotNull(message = "branchname is required")
    private String branchName;

    @NotNull(message = "ifscCode is required")
    private String ifscCode;

    // No-argument constructor
    public CreateAccountRequest() {
    }

    // Getters

    public Integer getCustomerId() {
        return customerId;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public String getBranchName() {
        return branchName;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    // Setters

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }
}