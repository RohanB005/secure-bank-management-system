package com.bank.account.dto.response;

import java.math.BigDecimal;

public class TransferResponse {

    private Integer fromAccountId;
    private Integer toAccountId;
    private BigDecimal fromAccountBalance;
    private BigDecimal toAccountBalance;
    private String status;

    // No-argument constructor
    public TransferResponse() {
    }

    // All-argument constructor
    public TransferResponse(
            Integer fromAccountId,
            Integer toAccountId,
            BigDecimal fromAccountBalance,
            BigDecimal toAccountBalance,
            String status) {

        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.fromAccountBalance = fromAccountBalance;
        this.toAccountBalance = toAccountBalance;
        this.status = status;
    }

    // Getters

    public Integer getFromAccountId() {
        return fromAccountId;
    }

    public Integer getToAccountId() {
        return toAccountId;
    }

    public BigDecimal getFromAccountBalance() {
        return fromAccountBalance;
    }

    public BigDecimal getToAccountBalance() {
        return toAccountBalance;
    }

    public String getStatus() {
        return status;
    }

    // Setters

    public void setFromAccountId(Integer fromAccountId) {
        this.fromAccountId = fromAccountId;
    }

    public void setToAccountId(Integer toAccountId) {
        this.toAccountId = toAccountId;
    }

    public void setFromAccountBalance(BigDecimal fromAccountBalance) {
        this.fromAccountBalance = fromAccountBalance;
    }

    public void setToAccountBalance(BigDecimal toAccountBalance) {
        this.toAccountBalance = toAccountBalance;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}