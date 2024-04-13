package com.example.rabc_backend.controller;

import com.example.rabc_backend.model.Role;
import com.example.rabc_backend.note.AuthToken;
import com.example.rabc_backend.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@AuthToken
@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/{roleId}")
    public Role getRoleById(@PathVariable String roleId) {
        return roleService.getRoleById(roleId);
    }

    @PostMapping("/")
    public void addRole(@RequestBody Role role) {
        roleService.addRole(role);
    }

    @PutMapping("/")
    public void updateRole( @RequestBody Role role) {
        roleService.updateRole(role);
    }

    @DeleteMapping("/{roleId}")
    public void deleteRole(@PathVariable String roleId) {
        roleService.deleteRole(roleId);
    }
}
