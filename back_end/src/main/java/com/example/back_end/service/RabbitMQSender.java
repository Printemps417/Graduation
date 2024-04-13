package com.example.rabc_backend.service;

import com.example.rabc_backend.model.Lesson;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class RabbitMQSender {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void send(String message) {
        String context = message + new Date();
        System.out.println("Sender : " + context);
        rabbitTemplate.convertAndSend("hello", context);
    }

    public void ChooseLesson(int id){
        System.out.println("选课 : " + id+"加入队列");
        rabbitTemplate.convertAndSend("lessons",id);
    }
}