package com.example.rabc_backend.model;
import lombok.Data;

import java.util.Date;

@Data
public class User {
    private String key;
    private String userId;
    private String account="admin";
    private String userName;
    private String userNickname;
    private String department;
    private String phoneNumber;
    private boolean status;
    private Date createTime;
}
