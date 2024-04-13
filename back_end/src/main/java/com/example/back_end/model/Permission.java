package com.example.rabc_backend.model;

import lombok.Data;

@Data
public class Permission {
    private String key;
    private String menuName;
    private String icon;
    private String permission;
    private String componentPath;
    private String componentName;
    private boolean status;
}
