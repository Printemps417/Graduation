package com.example.back_end.controller;

import com.example.back_end.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
@RestController
@CrossOrigin
//精准配置跨域
public class WebCheckController {
    private String StaticPath="E:\\local_repository\\Graduation\\back_end\\src\\main\\resources\\Static";
    @ApiOperation("此接口用于查询用户信息")
    @GetMapping("/userdata")
    public String query_by_username(String username){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\admin.json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        // 将User对象序列化为JSON字符串
        String json;
        try {
            json = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }

        // 将JSON字符串写回文件
        try {
            FileUtils.writeStringToFile(new File("user.json"), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return json;
    }

    @ApiOperation("此接口用于更改密码")
    @GetMapping("/update_userinfo")
    public String update_userinfo(String account,
                                  String password){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\admin.json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return "更新密码失败！";
        }
        user.setAccount(account);
        user.setPassword(password);

        // 将User对象序列化为JSON字符串
        String json;
        try {
            json = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "更新密码失败！";
        }

        // 将JSON字符串写回文件
        try {
            FileUtils.writeStringToFile(new File("user.json"), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "更新密码失败！";
        }
        return "更新密码成功！";
    }

    @ApiOperation("此接口用于查询用户信息")
    @GetMapping("/update_userdata")
    public String update_userdata(List<String> action,
                                  JSONObject datas){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\admin.json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return "更新数据失败！";
        }
        user.setAction(action);
        user.setDatas(datas);
        // 将User对象序列化为JSON字符串
        String json;
        try {
            json = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "更新数据失败！";
        }

        // 将JSON字符串写回文件
        try {
            FileUtils.writeStringToFile(new File("user.json"), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "更新数据失败！";
        }
        return "更新数据成功！";
    }
}
