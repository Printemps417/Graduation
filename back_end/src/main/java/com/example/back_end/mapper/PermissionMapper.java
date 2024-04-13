package com.example.back_end.mapper;

import com.example.rabc_backend.model.Permission;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PermissionMapper {
    @Select("SELECT * FROM permissions")
    List<Permission> getAllPermissions();

    @Select("SELECT * FROM permissions WHERE `key` = #{key}")
    Permission getPermissionByKey(@Param("key") String key);

    @Insert("INSERT INTO permissions (`key`, menuName, icon, permission, componentPath, componentName, status) " +
            "VALUES (#{permission.key}, #{permission.menuName}, #{permission.icon}, #{permission.permission}, " +
            "#{permission.componentPath}, #{permission.componentName}, #{permission.status})")
    void insertPermission(@Param("permission") Permission permission);

    @Update("UPDATE permissions SET menuName = #{permission.menuName}, icon = #{permission.icon}, " +
            "permission = #{permission.permission}, componentPath = #{permission.componentPath}, " +
            "componentName = #{permission.componentName}, status = #{permission.status} " +
            "WHERE `key` = #{permission.key}")
    void updatePermission(@Param("permission") Permission permission);

    @Delete("DELETE FROM permissions WHERE `menuName` = #{menuName}")
    void deletePermission(@Param("menuName") String menuName);
}
