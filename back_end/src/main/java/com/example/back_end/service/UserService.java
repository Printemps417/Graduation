package com.example.rabc_backend.service;

import com.example.rabc_backend.mapper.UserMapper;
import com.example.rabc_backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private final UserMapper userMapper;

    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }

    public User getUserById(String userId) {
        return userMapper.getUserById(userId);
    }

    public List<User> getUserByAccount(String Account) {
        return userMapper.getUserByAccount(Account);
    }

    public void addUser(User user) {
        userMapper.insertUser(user);
    }

    public void updateUser(User user) {
        userMapper.updateUser(user);
    }

    public void deleteUser(String userId) {
        userMapper.deleteUser(userId);
    }
}
//    登录界面代码
//    private final Usermapper userMapper;
//    public String getUserById(String account, String password) {
//        System.out.println(account);
//        System.out.println(password);
//        User test=userMapper.getUserById(account);
//        System.out.println("正确：");
//        System.out.println(test.getAccount());
//        System.out.println(test.getPassword());
//        if(test.getPassword().equals(password)){
//            System.out.println("登录成功！");
//            return "登录成功！";
//        }
//        System.out.println("登录失败");
//        return null;
//    }
//
//    public User getUserName(String account){
//        return userMapper.getUserName(account);
//    }
