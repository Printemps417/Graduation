package com.example.rabc_backend.service;

import com.example.rabc_backend.mapper.LessonMapper;
import com.example.rabc_backend.model.Lesson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonMapper lessonMapper;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void addLesson(Lesson lesson) {
        lessonMapper.addLesson(lesson);
    }

    public void deleteLesson(int id) {
        lessonMapper.deleteLesson(id);
    }

    public void updateLesson(Lesson lesson) {
        lessonMapper.updateLesson(lesson);
    }

    public Lesson getLessonById(int id) {
        return lessonMapper.getLessonById(id);
    }

    public List<Lesson> getAllLessons() {
        List<Lesson> lessons = new ArrayList<>();

        // 假设您使用 "lesson:" 作为键的前缀
        Set<String> keys = redisTemplate.keys("lesson:*");
        if (keys != null) {
            for (String key : keys) {
                Lesson lesson = (Lesson) redisTemplate.opsForValue().get(key);
                if (lesson != null) {
                    lessons.add(lesson);
                }
            }
        }

        // 如果 Redis 中没有数据，则从数据库加载并存入 Redis
        if (lessons.isEmpty()) {
            System.out.println("从数据库中读取课程信息……");
            lessons = lessonMapper.getAllLessons(); // 从数据库获取
            for (Lesson lesson : lessons) {
                redisTemplate.opsForValue().set("lesson:" + lesson.getId(), lesson);
            }
        }
        else {
            System.out.println("从Redis中读取课程信息……");
        }

        return lessons;
    }

    public void enrollInLessonByName(String name) {
        lessonMapper.enrollInLessonByName(name);
    }

    public void enrollInLessonById(int id) {
//        System.out.println("课程被选中："+id);
        lessonMapper.enrollInLessonById(id);
    }
}
