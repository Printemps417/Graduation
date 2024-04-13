package com.example.back_end.mapper;
import com.example.rabc_backend.model.Role;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoleMapper {

    @Select("SELECT * FROM roles")
    List<Role> getAllRoles();

    @Select("SELECT * FROM roles WHERE roleId = #{roleId}")
    Role getRoleById(@Param("roleId") String roleId);

    @Insert("INSERT INTO roles (`key`, roleId, roleName, roleType, roleIdentifier, displayOrder, remark, status, createTime) " +
            "VALUES (#{role.key}, #{role.roleId}, #{role.roleName}, #{role.roleType}, #{role.roleIdentifier}, " +
            "#{role.displayOrder}, #{role.remark}, #{role.status}, #{role.createTime})")
    void insertRole(@Param("role") Role role);

    @Update("UPDATE roles SET `key` = #{role.key}, roleName = #{role.roleName}, roleType = #{role.roleType}, " +
            "roleIdentifier = #{role.roleIdentifier}, displayOrder = #{role.displayOrder}, remark = #{role.remark}, " +
            "status = #{role.status}, createTime = #{role.createTime} WHERE roleId = #{role.roleId}")
    void updateRole(@Param("role") Role role);

    @Delete("DELETE FROM roles WHERE roleId = #{roleId}")
    void deleteRole(@Param("roleId") String roleId);
}
