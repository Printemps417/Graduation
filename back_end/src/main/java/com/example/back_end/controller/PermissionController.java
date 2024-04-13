package com.example.rabc_backend.controller;

import com.example.rabc_backend.model.Permission;
import com.example.rabc_backend.note.AuthToken;
import com.example.rabc_backend.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@AuthToken
@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
public class PermissionController {
    private final PermissionService permissionService;
    @AuthToken
    @GetMapping("/")
    public List<Permission> getAllPermissions() {
        return permissionService.getAllPermissions();
    }

    @GetMapping("/{key}")
    public Permission getPermissionByKey(@PathVariable String key) {
        return permissionService.getPermissionByKey(key);
    }

    @PostMapping("/")
    public void addPermission(@RequestBody Permission permission) {
        permissionService.addPermission(permission);
    }

    @PutMapping("/")
    public void updatePermission(@RequestBody Permission permission) {
        permissionService.updatePermission(permission);
    }

    @DeleteMapping("/{menuName}")
    public void deletePermission(@PathVariable String menuName) {
        permissionService.deletePermission(menuName);
    }
}
