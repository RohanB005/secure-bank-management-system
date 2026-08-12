package com.bank.account.dto.request;

import java.math.BigDecimal;

public class TransferRequest {

    private Integer fromAccountId;
    private Integer toAccountId;
    private BigDecimal amount;

    // No-argument constructor
    public TransferRequest() {
    }

    // All-argument constructor
    public TransferRequest(
            Integer fromAccountId,
            Integer toAccountId,
            BigDecimal amount) {

        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
    }

    // Getters

    public Integer getFromAccountId() {
        return fromAccountId;
    }

    public Integer getToAccountId() {
        return toAccountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    // Setters

    public void setFromAccountId(Integer fromAccountId) {
        this.fromAccountId = fromAccountId;
    }

    public void setToAccountId(Integer toAccountId) {
        this.toAccountId = toAccountId;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}