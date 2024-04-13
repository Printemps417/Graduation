package com.example.back_end.mapper;

import com.example.rabc_backend.model.Account;
import org.apache.ibatis.annotations.*;

import java.util.List;
@Mapper
public interface AccountMapper {

    @Insert("INSERT INTO useraccount(account, password) VALUES(#{account}, #{password})")
    void addAccount(@Param("account") String account, @Param("password") String password);

    @Delete("DELETE FROM useraccount WHERE account = #{account}")
    void deleteAccount(@Param("account") String account);

    @Update("UPDATE useraccount SET password = #{password} WHERE account = #{account}")
    void updatePassword(@Param("account") String account, @Param("password") String password);

    @Select("SELECT * FROM useraccount WHERE account = #{account}")
    Account getAccountByAccount(@Param("account") String account);

    @Select("SELECT * FROM useraccount")
    List<Account> getAllAccounts();
}
