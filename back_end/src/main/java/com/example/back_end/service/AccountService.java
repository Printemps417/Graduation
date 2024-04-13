package com.example.rabc_backend.service;

import com.example.rabc_backend.mapper.AccountMapper;
import com.example.rabc_backend.model.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    @Autowired
    private final AccountMapper accountMapper;

    public void addAccount(Account account) {
        accountMapper.addAccount(account.getAccount(), account.getPassword());
    }

    public void deleteAccount(String account) {
        accountMapper.deleteAccount(account);
    }

    public void updatePassword(String account, String newPassword) {
        accountMapper.updatePassword(account, newPassword);
    }

    public Account getAccountByAccount(String account) {
        return accountMapper.getAccountByAccount(account);
    }

    public List<Account> getAllAccounts() {
        return accountMapper.getAllAccounts();
    }
}
