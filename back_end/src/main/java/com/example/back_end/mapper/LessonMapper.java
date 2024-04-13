package com.example.back_end.mapper;

import com.example.rabc_backend.model.Lesson;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LessonMapper {

    @Insert("INSERT INTO lessons(id, name, teacher, time, choosennum, maxnum) " +
            "VALUES(#{id}, #{name}, #{teacher}, #{time}, #{choosennum}, #{maxnum})")
    void addLesson(Lesson lesson);

    @Delete("DELETE FROM lessons WHERE id = #{id}")
    void deleteLesson(@Param("id") int id);

    @Update("UPDATE lessons SET name = #{name}, teacher = #{teacher}, time = #{time}, " +
            "choosennum = #{choosennum}, maxnum = #{maxnum} WHERE id = #{id}")
    void updateLesson(Lesson lesson);

    @Select("SELECT * FROM lessons WHERE id = #{id}")
    Lesson getLessonById(@Param("id") int id);

    @Select("SELECT * FROM lessons")
    List<Lesson> getAllLessons();

    @Update("UPDATE lessons SET choosennum = choosennum + 1 WHERE name = #{name}")
    void enrollInLessonByName(@Param("name") String name);

    @Update("UPDATE lessons SET choosennum = choosennum + 1 WHERE id = #{id}")
    void enrollInLessonById(@Param("id") int id);
}