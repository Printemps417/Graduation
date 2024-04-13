package com.example.back_end.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Mapper
public interface AllocateMapper {

    // user_role表格修改
    void deleteRolesByUsername(@Param("user_name") String user_name);
    void allocateRoles(@Param("user_name") String user_name, @Param("role_name") String role_name);
    List<String> getRolesByUsername(@Param("user_name") String user_name);


    // role_permission表格修改
    void deletePermissionsByRoleId(@Param("role_name") String role_name);
    void allocatePermissions(@Param("role_name") String rolename, @Param("permission_name") String permissionname);
    List<String> getPermissionsByRoleName(@Param("role_name") String role_name);
}
