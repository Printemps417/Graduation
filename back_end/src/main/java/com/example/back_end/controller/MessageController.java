package com.example.rabc_backend.controller;

import com.example.rabc_backend.service.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private RabbitMQSender sender;

    @PostMapping
    public void sendMessage(@RequestBody String message) {
        System.out.println("received!");
        sender.send(message);
    }

    @GetMapping("/demo")
    public String sendMessageTest() {
        System.out.println("received!");
        sender.send("hello world");
        return "done";
    }
}