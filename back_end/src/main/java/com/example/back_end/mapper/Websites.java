package com.example.back_end.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.back_end.entity.websites;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

//用mybatisplus提供crud的接口，不用自己实现（Mybatis需要加注释和SQL语句）
@Mapper
public interface Websites extends BaseMapper<websites> {
//    只要模板类的名称和对应数据库一样，就自动生成增删改查操作
    @Select("select * from websites")
    public List<websites> selectAllData();
}
