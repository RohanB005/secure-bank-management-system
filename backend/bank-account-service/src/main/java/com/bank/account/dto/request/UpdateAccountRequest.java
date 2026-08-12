package com.bank.account.dto.request;

import com.bank.account.entity.Account.AccountType;

public class UpdateAccountRequest {

    private AccountType accountType;

    // No-argument constructor
    public UpdateAccountRequest() {
    }

    // Getter
    public AccountType getAccountType() {
        return accountType;
    }

    // Setter
    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }
}