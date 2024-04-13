package com.example.rabc_backend.component;

import com.example.rabc_backend.model.Lesson;
import com.example.rabc_backend.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StartupRunner implements CommandLineRunner {
    @Autowired
    private LessonService lessonService; // 假设这是您的服务类

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public void run(String... args) throws Exception {
        List<Lesson> lessons = lessonService.getAllLessons();
        for (Lesson lesson : lessons) {
            redisTemplate.opsForValue().set("lesson:" + lesson.getId(), lesson);
        }
    }
}