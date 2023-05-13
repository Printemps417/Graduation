package com.example.back_end.controller;

import com.example.back_end.entity.WebData;
import com.example.back_end.mapper.UserMapper;
import io.swagger.annotations.ApiOperation;
import org.python.antlr.ast.Str;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.io.Console;

@RestController
@CrossOrigin
public class DatabaseController {
    //    @PostMapping("/upload")
    @Autowired
    private UserMapper userMapper;
    //    Spring功能，将实例化的对象注入userMapper
//CRUD操作
    @ApiOperation("此接口用于查询某一数据表内容")
    @GetMapping("/gettabledata")
    public List query(String databasename,String tablename){
//        更新查询数据库名
        System.out.println("用户查询数据表为"+tablename);
        List<WebData> list= userMapper.getall(databasename,tablename);
//        System.out.println(list);
        return list;
    }
    //    根据数据库名和数据表名查询数据

    @ApiOperation("此接口用于查询库中全部表名称")
    @GetMapping("/gettablename")
    public List queryname(String databasename){
//        更新查询数据库名
        System.out.println("用户查询数据库为"+databasename);
        List<String> list= userMapper.gettablename(databasename);
//        System.out.println(list);
        return list;
    }
//    查询库内表名

    @ApiOperation("此接口用于给某一数据库去重")
    @DeleteMapping("/distinctTable")
    public String Distinct(String databasename) throws IOException{
//        更新查询数据库名
        System.out.println("用户去重数据库为"+databasename);
        List<String> list= userMapper.gettablename(databasename);
        for(String tbname: list){
            userMapper.DistinctByid(databasename,tbname);
        }
        //        System.out.println(list);
        return "去重成功";
    }

    @ApiOperation("此接口用于查询数据库名列表")
    @GetMapping("/getdbname")
    public List querydbname(){
        System.out.println("用户查询数据库");
        List<String> list= userMapper.getdbname();
//        System.out.println(list);
        return list;
    }
    //    查询数据库名列表
    public static String readTerminal() {
        try {
            // 创建进程构造器并设置命令
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command("cmd", "/c", "type con");

            // 启动进程并获取进程输出流
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            // 读取进程输出并存储到字符串中
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
                stringBuilder.append(System.lineSeparator());
            }

            // 等待进程执行完毕
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("命令执行失败");
            }

            // 返回进程输出字符串
            return stringBuilder.toString();
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
//    读取控制台信息
    
}
