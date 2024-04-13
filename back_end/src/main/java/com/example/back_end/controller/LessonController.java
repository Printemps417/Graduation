package com.example.rabc_backend.controller;

import com.example.rabc_backend.model.Lesson;
import com.example.rabc_backend.service.LessonService;
import com.example.rabc_backend.service.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

@CrossOrigin
@RestController
@RequestMapping("/lessons")
public class LessonController {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Autowired
    private RabbitMQSender sender;

    public boolean lock(String key, long expireTime) {
        Boolean acquired = redisTemplate.opsForValue().setIfAbsent(key, "lock", expireTime, TimeUnit.MILLISECONDS);
        return Boolean.TRUE.equals(acquired);
    }

    public void unlock(String key) {
        redisTemplate.delete(key);
    }

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PostMapping
    public void addLesson(@RequestBody Lesson lesson) {
        lessonService.addLesson(lesson);
    }

    @DeleteMapping("/{id}")
    public void deleteLesson(@PathVariable int id) {
        lessonService.deleteLesson(id);
    }

    @PutMapping
    public void updateLesson(@RequestBody Lesson lesson) {
        lessonService.updateLesson(lesson);
    }

    @GetMapping("/{id}")
    public Lesson getLessonById(@PathVariable int id) {
        return lessonService.getLessonById(id);
    }

    @GetMapping
    public List<Lesson> getAllLessons() {
        return lessonService.getAllLessons();
    }

    @PostMapping("/choose")
    public void chooseLesson(@RequestBody Lesson lesson) {
        lessonService.enrollInLessonById(lesson.getId());
    }

    @PostMapping("/enroll")
    public String enrollInLesson(@RequestBody Lesson orilesson) {
        int lessonId = orilesson.getId();
        String lockKey = "lessonLock:" + lessonId;

        try {
            if (lock(lockKey, 100)) { // 尝试获取锁，超时时间设置为100ms
                Lesson lesson = (Lesson) redisTemplate.opsForValue().get("lesson:" + lessonId);
                if (lesson.getChoosennum() < lesson.getMaxnum()) {
                    lesson.setChoosennum(lesson.getChoosennum() + 1);
//                    打印选课信息，查看是否有超选现象发生
                    System.out.println(lesson.getName()+" "+lesson.getChoosennum()+":"+lesson.getMaxnum());
                    redisTemplate.opsForValue().set("lesson:" + lessonId, lesson);
                    sender.ChooseLesson(lessonId);
                    return "选课成功";
                } else {
                    return "选课失败";
                }
            } else {
                return "系统繁忙，请稍后再试";
            }
        } finally {
            unlock(lockKey); // 释放锁
        }
    }
    @GetMapping("/enroll_test/{lessonId}")
    public String enrollInLesson_test(@PathVariable int lessonId) {
        String lockKey = "lessonLock:" + lessonId;

        try {
            if (lock(lockKey, 100)) { // 尝试获取锁，超时时间设置为100ms
                Lesson lesson = (Lesson) redisTemplate.opsForValue().get("lesson:" + lessonId);
                if (lesson.getChoosennum() < lesson.getMaxnum()) {
                    lesson.setChoosennum(lesson.getChoosennum() + 1);
//                    打印选课信息，查看是否有超选现象发生
                    System.out.println(lesson.getName()+" "+lesson.getChoosennum()+":"+lesson.getMaxnum());
                    redisTemplate.opsForValue().set("lesson:" + lessonId, lesson);
                    sender.ChooseLesson(lessonId);
                    return "选课成功";
                } else {
                    System.out.println(lesson.getName()+"名额不足，选课失败");
                    return "选课失败";
                }
            } else {
                return "系统繁忙，请稍后再试";
            }
        } finally {
            unlock(lockKey); // 释放锁
        }
    }
}
