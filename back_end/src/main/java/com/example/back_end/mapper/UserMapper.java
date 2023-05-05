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

    @Insert("insert into ${dbname} values(#{id},#{name},#{url},#{alexa},#{sal},#{country})")
    public int add(WebData web);
//    返回值代表插入几条记录

    @Update("update ${dbname} set id=#{id},name=#{name},url=#{url},alexa=#{alexa},sal=#{sal},country=#{country} where id=#{id}")
    public int updatedata(WebData web);

    @Delete("delete from  ${dbname} where id=#{id}")
    public int deletedata(int id);

    @Select("select * from ${dbname} where id=#{id}")
    public List<WebData> findById(int id);
//    按id查找

}
