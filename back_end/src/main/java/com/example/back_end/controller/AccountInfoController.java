package com.example.back_end.controller;

import com.example.back_end.entity.User;
import com.example.back_end.mapper.UserMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
@RestController
@CrossOrigin
//精准配置跨域
public class AccountInfoController {
    @Autowired
    private UserMapper userMapper;
    //    给userMapper接口注入实例
    private String StaticPath="E:\\local_repository\\Graduation\\back_end\\src\\main\\resources\\UserData";
    @ApiOperation("此接口用于查询用户信息")
    @GetMapping("/userdata")
    public String query_by_username(String username){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+username+".json";
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
            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return json;
    }
    @ApiOperation("此接口用于查询用户数据库")
    @GetMapping("/userdata_db")
    public List<String> db_by_username(String username){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+username+".json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return user.getDatabase();
    }

    @ApiOperation("此接口用于更改密码")
    @PostMapping("/update_userinfo")
    public String update_userinfo(String account,
                                  String password){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+account+".json";
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
            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "更新密码失败！";
        }
        return "更新密码成功！";
    }

    @ApiOperation("此接口用于用户注册")
    @PostMapping("/signup_userinfo")
    public String signup_userinfo(String account,
                                  String password){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+account+".json";

//        给每个新注册的用户初始化示例图层
        List<String> db =  Arrays.asList(new String[]{});
        List<String> actions =  Arrays.asList(new String[]{"Scatter", "Bubble", "Text", "Heat", "Strip", "Equal", "Dtrip", "HeatGrid", "Cluster"});
        List<String> datas =  Arrays.asList(new String[]{"http://localhost:8088/DownloadData?FileName=ScatterSample.csv","http://localhost:8088/DownloadData?FileName=BubbleSample.json","http://localhost:8088/DownloadData?FileName=TextSample.json","http://localhost:8088/DownloadData?FileName=HeatmapSample2.json","http://localhost:8088/DownloadData?FileName=TripDataSample.json","http://localhost:8088/DownloadData?FileName=EqualLineSample.json","http://localhost:8088/DownloadData?FileName=DynamicTripSample.json","http://localhost:8088/DownloadData?FileName=HeatSample.csv","http://localhost:8088/DownloadData?FileName=ScatterSample.csv"});
        List<String> layers =  Arrays.asList(new String[]{"示例-散点图","示例-气泡点图","示例-文本标注","示例-热力图","示例-静态轨迹","示例-等高线","示例-动态轨迹","示例-网格热力图","示例-聚合点图"});
        List<String> description =  Arrays.asList(new String[]{"测试","测试","测试","测试","测试","测试","测试","测试","测试"});
        List<Boolean> visible =  Arrays.asList(new Boolean[]{false,false,false,false,false,false,false,false,false});
        User user=new User(account,password,db,actions,datas,layers,description,visible);

        // 将User对象序列化为JSON字符串
        String json;
        try {
            json = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "用户注册失败！";
        }

        // 将JSON字符串写入新建的用户文件
        try {
            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "用户注册失败！";
        }
        return "用户注册成功！";
    }
    @ApiOperation("此接口用于添加用户数据库")
    @PostMapping("/add_database")
    public String add_database(String account,
                               String db){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+account+".json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return "添加数据库失败！";
        }
//        Gson gson = new Gson();
//        String datastr = gson.toJson(datas); // jsonObject 为要转换的 JSON 对象
        List<String> olddb=user.getDatabase();
        db=db.toLowerCase();
        olddb.add(db);
        System.out.println(olddb);
        user.setDatabase(olddb);
        // 将User对象序列化为JSON字符串
        String json;
        try {
            json = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "添加数据库失败！";
        }

        // 将JSON字符串写回文件
        try {
            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "添加数据库失败！";
        }
        return "添加数据库成功！";
    }
    @ApiOperation("此接口用于删除用户数据库")
    @DeleteMapping ("/del_database")
    public String del_database(String account,
                               String db){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+account+".json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return "删除数据库失败！";
        }
//        Gson gson = new Gson();
//        String datastr = gson.toJson(datas); // jsonObject 为要转换的 JSON 对象
        List<String> olddb=user.getDatabase();
        int index=olddb.indexOf(db);
        System.out.println(olddb);
        if(index>=0||account=="admin"){
            olddb.remove(index);
            int temp= userMapper.DeleteDatabaseById(db);
//            确保用户只能删除自身上传的数据库，管理员可以删除任何数据库
        }
        else{
            return "数据库不存在，删除失败";
        }
//        将数据库名移出用户数据库数组
        user.setDatabase(olddb);
        // 将User对象序列化为JSON字符串
        String json;
        try {
            json = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "删除数据库失败！";
        }

        // 将JSON字符串写回文件
        try {
            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "删除数据库失败！";
        }
        System.out.println("数据库"+db+"删除成功");
        return "删除数据库成功！";
    }


////    以下是图层操作
//    @ApiOperation("此接口用于更该图层可见度")
//    @PostMapping("/toggle_visible")
//    public String toggle_visible(String account,String layer){
//        ObjectMapper mapper = new ObjectMapper();
//        String FilePath=this.StaticPath+"\\"+account+".json";
//        User user;
//        try {
//            user = mapper.readValue(new File(FilePath), User.class);
//            System.out.println(user);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "更改可见度失败！";
//        }
//
//        List<Boolean> oldvisible=user.getVisible();
//        int index = user.getLayers().indexOf(layer);
//        if(index >= 0) {
//            oldvisible.set(index, !oldvisible.get(index));
////            将对应位置的可见度取反
//        }
//
//        String json;
//        try {
//            json = mapper.writeValueAsString(user);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            return "更改可见度失败！";
//        }
//
//        // 将JSON字符串写回文件
//        try {
//            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "更改可见度失败！";
//        }
//        return "更改可见度成功";
//    }
//    @ApiOperation("此接口用于添加图层信息")
//    @PostMapping("/update_userdata")
//    public String update_userdata(String account,
//                                  String action,
//                                  String data,
//                                  String layer,
//                                  String description){
//        ObjectMapper mapper = new ObjectMapper();
//        String FilePath=this.StaticPath+"\\"+account+".json";
//        User user;
//        try {
//            user = mapper.readValue(new File(FilePath), User.class);
//            System.out.println(user);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "更新数据失败！";
//        }
////        Gson gson = new Gson();
////        String datastr = gson.toJson(datas); // jsonObject 为要转换的 JSON 对象
//        List<String> oldactions=user.getAction();
//        List<String> olddatas=user.getDatas();
//        List<String> oldlayers=user.getLayers();
//        List<String> olddescription=user.getDescription();
//        List<Boolean> oldvisible=user.getVisible();
//        if(oldlayers.contains(layer)){
//            return "添加失败！该图层名已存在";
////            必须保证图层名互异，用于管理
//        }
//        oldactions.add(action);
//        olddatas.add(data);
//        oldlayers.add(layer);
//        olddescription.add(description);
//        oldvisible.add(true);
//
//        user.setAction(oldactions);
//        user.setDatas(olddatas);
//        user.setLayers(oldlayers);
//        user.setDescription(olddescription);
//        user.setVisible(oldvisible);
//        System.out.println(user+"更新信息成功");
//        // 将User对象序列化为JSON字符串
//        String json;
//        try {
//            json = mapper.writeValueAsString(user);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            return "更新数据失败！";
//        }
//
//        // 将JSON字符串写回文件
//        try {
//            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "更新数据失败！";
//        }
//        return "添加图层"+layer+"成功！";
//    }
//    @ApiOperation("此接口用于根据图层名删除图层")
//    @DeleteMapping("/delete_userdata")
//    public String delete_userdata(String account,
//                                  String layer){
//        ObjectMapper mapper = new ObjectMapper();
//        String FilePath=this.StaticPath+"\\"+account+".json";
//        User user;
//        try {
//            user = mapper.readValue(new File(FilePath), User.class);
//            System.out.println(user);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "删除失败！";
//        }
////        Gson gson = new Gson();
////        String datastr = gson.toJson(datas); // jsonObject 为要转换的 JSON 对象
//        List<String> oldactions=user.getAction();
//        List<String> olddatas=user.getDatas();
//        List<String> oldlayers=user.getLayers();
//        List<String> olddescription=user.getDescription();
//
//        int index = user.getLayers().indexOf(layer);
//        if(index >= 0) {
//            oldactions.remove(index);
//            olddatas.remove(index);
//            oldlayers.remove(index);
//            olddescription.remove(index);
//        }
//        user.setAction(oldactions);
//        user.setDatas(olddatas);
//        user.setLayers(oldlayers);
//        user.setDescription(olddescription);
//        // 将User对象序列化为JSON字符串
//        String json;
//        try {
//            json = mapper.writeValueAsString(user);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            return "删除数据失败！";
//        }
//
//        // 将JSON字符串写回文件
//        try {
//            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "删除数据失败！";
//        }
//        return "删除数据成功！";
//    }
//
//    @ApiOperation("此接口用于下移图层")
//    @PostMapping("/downLayer")
//    public String downLayer(String account,
//                                  String layer){
//        ObjectMapper mapper = new ObjectMapper();
//        String FilePath=this.StaticPath+"\\"+account+".json";
//        User user;
//        try {
//            user = mapper.readValue(new File(FilePath), User.class);
//            System.out.println(user);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "删除失败！";
//        }
////        Gson gson = new Gson();
////        String datastr = gson.toJson(datas); // jsonObject 为要转换的 JSON 对象
//        List<String> oldactions=user.getAction();
//        List<String> olddatas=user.getDatas();
//        List<String> oldlayers=user.getLayers();
//        List<String> olddescription=user.getDescription();
//
//        int index = user.getLayers().indexOf(layer);
//        shiftElement(oldactions,index);
//        shiftElement(olddatas,index);
//        shiftElement(oldlayers,index);
//        shiftElement(olddescription,index);
//
////        保存修改
//        user.setAction(oldactions);
//        user.setDatas(olddatas);
//        user.setLayers(oldlayers);
//        user.setDescription(olddescription);
//        // 将User对象序列化为JSON字符串
//        String json;
//        try {
//            json = mapper.writeValueAsString(user);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            return "删除数据失败！";
//        }
//
//        // 将JSON字符串写回文件
//        try {
//            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "删除数据失败！";
//        }
//        return "删除数据成功！";
//    }
//
////    实现元素交换
//    public static <T> void shiftElement(List<T> list, int index) {
//        // 检查索引是否有效
//        if (index >= 0 && index < list.size() - 1) {
//            // 将元素后移一个位置
//            T temp = list.get(index);
//            list.set(index, list.get(index + 1));
//            list.set(index + 1, temp);
//        }
//    }

}


