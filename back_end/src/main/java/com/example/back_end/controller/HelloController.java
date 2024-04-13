package com.example.rabc_backend.controller;

import com.example.rabc_backend.note.AuthToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    private final Logger logger = LoggerFactory.getLogger(getClass());
    @AuthToken
    @GetMapping("/hello")
    public  String hello(){
        return "hello";
    }
    @GetMapping("/hello2")
    public  String hello2(){
        redisTemplate.opsForValue().set("testtoken","test");
        System.out.println(redisTemplate.opsForValue().get("rbactoken"));
        logger.info("rbactoken:"+redisTemplate.opsForValue().get("rbactoken"));
        return "hello2,has authorized";
    }
    @GetMapping("/logintest")
    public  String login(){
        // 设置键值对
        redisTemplate.opsForValue().set("key", "value");

        // 获取键对应的值
        String value = (String) redisTemplate.opsForValue().get("key");
        System.out.println(value);
        return "登录成功";
    }

}
