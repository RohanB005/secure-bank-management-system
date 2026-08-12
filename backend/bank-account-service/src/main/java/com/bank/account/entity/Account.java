package com.bank.account.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accountId")
    private Integer accountId;

    @Column(name = "customerId", nullable = false)
    private Integer customerId;

    @Column(name = "accountNumber", unique = true, nullable = false)
    private String accountNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "accountType", nullable = false)
    private AccountType accountType;

    @Column(name = "balance", nullable = false)
    private BigDecimal balance = BigDecimal.ZERO;

    @Column(name = "branchName", nullable = false)
    private String branchName;

    @Column(name = "ifscCode", nullable = false)
    private String ifscCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AccountStatus status = AccountStatus.Active;

    @Column(name = "openDate", nullable = false)
    private LocalDate openDate = LocalDate.now();

    // No-argument constructor required by JPA
    public Account() {
    }

    // All-argument constructor
    public Account(Integer accountId, Integer customerId, String accountNumber,
                   AccountType accountType, BigDecimal balance,
                   String branchName, String ifscCode,
                   AccountStatus status, LocalDate openDate) {

        this.accountId = accountId;
        this.customerId = customerId;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.branchName = branchName;
        this.ifscCode = ifscCode;
        this.status = status;
        this.openDate = openDate;
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

    public AccountType getAccountType() {
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

    public AccountStatus getStatus() {
        return status;
    }

    public LocalDate getOpenDate() {
        return openDate;
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

    public void setAccountType(AccountType accountType) {
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

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public void setOpenDate(LocalDate openDate) {
        this.openDate = openDate;
    }

    public enum AccountType {
        Savings, Current, Salary
    }

    public enum AccountStatus {
        Active, Inactive, Blocked, Closed
    }
}