package com.example.back_end.controller;

import com.example.back_end.entity.User;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import org.json.JSONObject;

import java.util.List;
@RestController
@CrossOrigin
//精准配置跨域
public class WebCheckController {
    @ApiOperation("此接口用于查询全部数据")
    @GetMapping("/logincheck")
    public User query_no_plus(String username){
        ArrayList<String> list = new ArrayList<String>();
        JSONObject obj = new JSONObject();
        User res=new User("admin","123456",list,obj);
        System.out.println(res);
        return res;
    }
}
