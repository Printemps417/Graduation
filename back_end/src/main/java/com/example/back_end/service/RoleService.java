package com.example.rabc_backend.service;

import com.example.rabc_backend.mapper.RoleMapper;
import com.example.rabc_backend.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {
    @Autowired
    private final RoleMapper roleMapper;

    public List<Role> getAllRoles() {
        return roleMapper.getAllRoles();
    }

    public Role getRoleById(String roleId) {
        return roleMapper.getRoleById(roleId);
    }

    public void addRole(Role role) {
        roleMapper.insertRole(role);
    }

    public void updateRole(Role role) {
        roleMapper.updateRole(role);
    }

    public void deleteRole(String roleId) {
        roleMapper.deleteRole(roleId);
    }
}
