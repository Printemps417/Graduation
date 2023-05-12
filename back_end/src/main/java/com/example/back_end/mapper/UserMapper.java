package com.example.back_end.mapper;

import com.example.back_end.entity.WebData;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

//    查询所有用户，方法只需声明即可
//    动态代理生成实现类并继承接口并实现方法
    @Select("select * from `${dbname}`.`${tablename}` order by time")
    public List<WebData> getall(String dbname,String tablename);
//    查询用户信息

    @Select("SELECT table_name FROM information_schema.tables WHERE table_schema = '${dbname}';")
    public List<String> gettablename(String dbname);

    @Select("SHOW DATABASES LIKE \"%timedata%\";")
    public List<String> getdbname();

    @Delete("DROP DATABASE `${dbname}`;")
    public int DeleteDatabaseById(String dbname);

}
