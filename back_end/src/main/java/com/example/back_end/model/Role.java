package com.example.rabc_backend.model;

import lombok.Data;

import java.util.Date;
@Data
public class Role {
    private String key;
    private String roleId;
    private String roleName;
    private String roleType;
    private String roleIdentifier;
    private int displayOrder;
    private String remark;
    private boolean status;
    private Date createTime;
}
