package com.example.rabc_backend.service;

import com.example.rabc_backend.mapper.PermissionMapper;
import com.example.rabc_backend.model.Permission;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionService {
    @Autowired
    private final PermissionMapper permissionMapper;

    public List<Permission> getAllPermissions() {
        return permissionMapper.getAllPermissions();
    }

    public Permission getPermissionByKey(String key) {
        return permissionMapper.getPermissionByKey(key);
    }

    public void addPermission(Permission permission) {
        permissionMapper.insertPermission(permission);
    }

    public void updatePermission(Permission permission) {
        permissionMapper.updatePermission(permission);
    }

    public void deletePermission(String menuName) {
        permissionMapper.deletePermission(menuName);
    }
}
