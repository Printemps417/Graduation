package com.example.rabc_backend.component;

import com.example.rabc_backend.mapper.LessonMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class RabbitMQReceiver {
    @Autowired
    private LessonMapper lessonMapper;
//    消费者，监听hello队列
    @RabbitListener(queues = "hello")
    public void receive(String in) {
        System.out.println(" [x] Received '" + in + "'");
    }

    @RabbitListener(queues = "lessons")
    public void receive(int lessonId) {
        System.out.println("lesson"+lessonId+"消息响应 "+new Date());
        lessonMapper.enrollInLessonById(lessonId);
        System.out.println("lesson"+lessonId+"选课成功 "+new Date());
    }
}