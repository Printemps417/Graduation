package com.example.rabc_backend.service;

import com.example.rabc_backend.mapper.AllocateMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AllocateService {

    private final AllocateMapper allocateMapper;

    public void allocateRoles(String username, List<String> roleNames) {
        // 先删除用户对应的所有角色
        allocateMapper.deleteRolesByUsername(username);
        // 分配新的角色
        for(String roleName : roleNames){
            allocateMapper.allocateRoles(username,roleName);
        }
    }

    public void allocatePermissions(String roleName, List<String> permissionNames) {
        // 先删除角色对应的所有权限
        allocateMapper.deletePermissionsByRoleId(roleName);
        // 分配新的权限
        for (String permissionName : permissionNames) {
            allocateMapper.allocatePermissions(roleName, permissionName);
        }
    }

    public List<String> getUserRoles(String username) {
        // 获取用户的所有角色
        return allocateMapper.getRolesByUsername(username);
    }

    public List<String> getRolePermissions(String roleName) {
        // 获取角色的所有权限
        return allocateMapper.getPermissionsByRoleName(roleName);
    }
}
