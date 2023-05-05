package com.example.back_end.controller;

import com.example.back_end.entity.websites;
import com.example.back_end.mapper.Websites;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin
//精准配置跨域
public class WebCheckController {
    @Autowired
    private Websites webbody;
//    定义接口类，传输数据
//    Spring功能，将实例化的对象注入

    @ApiOperation("此接口用于查询全部数据")
    @GetMapping("/webdataplus2")
    public List<websites> query_no_plus(){
        List<websites> list= webbody.selectAllData();
        System.out.println(list);
        return list;
    }

    @ApiOperation("此接口用于查询全部数据")
    @GetMapping("/webdataplus")
    public List<websites> query(){
        List<websites> list= webbody.selectList(null);
        System.out.println(list);
        return list;
    }
    //    查询用户信息
    @ApiOperation("此接口添加数据")
    @PostMapping("/webdataplus")
    public String AddData(websites web){
        System.out.println(web);
        int i=webbody.insert(web);
        if(i>0) return "添加成功！";
        else return "插入失败！";
    }
//    添加用户信息

    @ApiOperation("此接口用于根据ID更新数据")
    @PutMapping("/webdataplus")
    public String Updatainfo(websites web){
        System.out.println("更新网站名称为："+web.getName());
        int i= webbody.updateById(web);;
        if(i>0) return "更新成功！";
        else return "更新失败！";
    }
    //    更新用户信息，传入类

    @ApiOperation("此接口用于根据ID删除数据")
    @DeleteMapping("/webdataplus")
    public String DelData(int id){
        System.out.println("删除网站id为："+id);
        int i=webbody.deleteById(id);
        if(i>0) return "删除成功！";
        else return "删除失败！";
    }
//    删除用户信息

    @ApiOperation("此接口用于根据ID查询数据")
    @GetMapping("/webdataplus/{id}")
    public websites findById(int id){
        websites list=  webbody.selectById(id);
        System.out.println(list);
        return list;
    }
}
