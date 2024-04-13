package com.example.rabc_backend.controller;

import com.example.rabc_backend.note.AuthToken;
import com.example.rabc_backend.service.AllocateService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@AuthToken
@RequestMapping("/allocate")
@RequiredArgsConstructor
public class AllocateController {

    private final AllocateService allocateService;

    @PostMapping("/roles")
    public void allocateRoles(@RequestBody AllocationRoles request) {
        allocateService.allocateRoles(request.getUsername(), request.getRoleNames());
    }

    @PostMapping("/permissions")
    public void allocatePermissions(@RequestBody AllocationPermission request) {
        allocateService.allocatePermissions(request.getRoleName(), request.getPermissionNames());
    }

    @GetMapping("/userRoles/{username}")
    public List<String> getUserRoles(@PathVariable String username) {
        return allocateService.getUserRoles(username);
    }

    @GetMapping("/rolePermissions/{roleName}")
    public List<String> getRolePermissions(@PathVariable String roleName) {
        return allocateService.getRolePermissions(roleName);
    }

    @GetMapping("/getmenus/{username}")
    public List<String> getMenus(@PathVariable String username) {
        List<String> roleList = allocateService.getUserRoles(username);
        Set<String> menuSet = new HashSet<>(); // Using Set to avoid duplicates

        for (String role : roleList) {
            List<String> rolePermissions = allocateService.getRolePermissions(role);
            menuSet.addAll(rolePermissions); // Add all permissions, duplicates will be ignored
        }
        System.out.println(menuSet);
        return new ArrayList<>(menuSet); // Convert the set back to a list
    }

    @Data
    public static class AllocationRoles {
        private String username;
        private List<String> roleNames;
    }

    @Data
    public static class AllocationPermission {
        private String roleName;
        private List<String> permissionNames;
    }
}
