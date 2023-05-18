package com.example.back_end.controller;
import com.example.back_end.entity.User;
import com.example.back_end.entity.WebData;
import com.example.back_end.mapper.UserMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.opencsv.CSVWriter;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class DataProcessController {

    private String StaticPath="E:\\local_repository\\Graduation\\back_end\\src\\main\\resources\\UserData";
    @Autowired
    private UserMapper userMapper;
    @ApiOperation("此接口用于从数据库导出选中数据")
    @GetMapping(value = "/download-csv")
    public ResponseEntity<byte[]> downloadCsv(@RequestParam List<String> tablelist, String dbname) throws IOException {
        List<WebData> res = new ArrayList<>();
        for (String tablename : tablelist) {
            List<WebData> temp = userMapper.getall(dbname, tablename);
            res.addAll(temp);
        }

        // 调用转换为CSV格式的方法
        byte[] csvBytes = convertToCsv(res);

        // 设置HTTP头部信息
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.setContentDispositionFormData("attachment", "data.csv");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(csvBytes);
    }

    private byte[] convertToCsv(List<WebData> dataList) throws IOException {
        // 在这里实现将WebData对象列表转换为CSV格式的逻辑，可以使用第三方库如OpenCSV或手动构建CSV字符串

        // 假设使用OpenCSV库将数据转换为CSV格式
        StringWriter stringWriter = new StringWriter();
        CSVWriter csvWriter = new CSVWriter(stringWriter);

        // 写入CSV标题行
        csvWriter.writeNext(new String[]{"Index", "Id", "Time","Lon","Lat","If_empty","Speed"});

        // 写入数据行
        for (WebData data : dataList) {
            csvWriter.writeNext(new String[]{
                    String.valueOf(data.getIndex()),
                    String.valueOf(data.getId()),
                    String.valueOf(data.getTime()),
                    String.valueOf(data.getLon()),
                    String.valueOf(data.getLat()),
                    String.valueOf(data.getIf_empty()),
                    String.valueOf(data.getSpeed())
            });
        }

        csvWriter.close();

        // 将CSV字符串转换为字节数组
        return stringWriter.toString().getBytes();
    }

    //    以下是图层操作
    @ApiOperation("此接口用于更该图层可见度")
    @PostMapping("/toggle_visible")
    public String toggle_visible(String account,String layer){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+account+".json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return "更改可见度失败！";
        }

        List<Boolean> oldvisible=user.getVisible();
        int index = user.getLayers().indexOf(layer);
        if(index >= 0) {
            oldvisible.set(index, !oldvisible.get(index));
//            将对应位置的可见度取反
        }

        String json;
        try {
            json = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "更改可见度失败！";
        }

        // 将JSON字符串写回文件
        try {
            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "更改可见度失败！";
        }
        return "更改可见度成功";
    }
    @ApiOperation("此接口用于添加图层信息")
    @PostMapping("/update_userdata")
    public String update_userdata(String account,
                                  String action,
                                  String data,
                                  String layer,
                                  String description){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+account+".json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return "更新数据失败！";
        }
//        Gson gson = new Gson();
//        String datastr = gson.toJson(datas); // jsonObject 为要转换的 JSON 对象
        List<String> oldactions=user.getAction();
        List<String> olddatas=user.getDatas();
        List<String> oldlayers=user.getLayers();
        List<String> olddescription=user.getDescription();
        List<Boolean> oldvisible=user.getVisible();
        if(oldlayers.contains(layer)){
            return "添加失败！该图层名已存在";
//            必须保证图层名互异，用于管理
        }
        oldactions.add(action);
        olddatas.add(data);
        oldlayers.add(layer);
        olddescription.add(description);
        oldvisible.add(true);

        user.setAction(oldactions);
        user.setDatas(olddatas);
        user.setLayers(oldlayers);
        user.setDescription(olddescription);
        user.setVisible(oldvisible);
        System.out.println(user+"更新信息成功");
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
            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "更新数据失败！";
        }
        return "添加图层"+layer+"成功！";
    }
    @ApiOperation("此接口用于根据图层名删除图层")
    @DeleteMapping("/delete_userdata")
    public String delete_userdata(String account,
                                  String layer){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+account+".json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return "删除失败！";
        }
//        Gson gson = new Gson();
//        String datastr = gson.toJson(datas); // jsonObject 为要转换的 JSON 对象
        List<String> oldactions=user.getAction();
        List<String> olddatas=user.getDatas();
        List<String> oldlayers=user.getLayers();
        List<String> olddescription=user.getDescription();

        int index = user.getLayers().indexOf(layer);
        if(index >= 0) {
            oldactions.remove(index);
            olddatas.remove(index);
            oldlayers.remove(index);
            olddescription.remove(index);
        }
        user.setAction(oldactions);
        user.setDatas(olddatas);
        user.setLayers(oldlayers);
        user.setDescription(olddescription);
        // 将User对象序列化为JSON字符串
        String json;
        try {
            json = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "删除数据失败！";
        }

        // 将JSON字符串写回文件
        try {
            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "删除数据失败！";
        }
        return "删除数据成功！";
    }

    @ApiOperation("此接口用于下移图层")
    @PostMapping("/downLayer")
    public String downLayer(String account,
                            String layer){
        ObjectMapper mapper = new ObjectMapper();
        String FilePath=this.StaticPath+"\\"+account+".json";
        User user;
        try {
            user = mapper.readValue(new File(FilePath), User.class);
            System.out.println(user);
        } catch (IOException e) {
            e.printStackTrace();
            return "更改图层位置失败！";
        }
//        Gson gson = new Gson();
//        String datastr = gson.toJson(datas); // jsonObject 为要转换的 JSON 对象
        List<String> oldactions=user.getAction();
        List<String> olddatas=user.getDatas();
        List<String> oldlayers=user.getLayers();
        List<String> olddescription=user.getDescription();
        List<Boolean> oldvisible=user.getVisible();

        int index = user.getLayers().indexOf(layer);
        shiftElement(oldactions,index);
        shiftElement(olddatas,index);
        shiftElement(oldlayers,index);
        shiftElement(olddescription,index);
        shiftElement(oldvisible,index);

//        保存修改
        user.setAction(oldactions);
        user.setDatas(olddatas);
        user.setLayers(oldlayers);
        user.setDescription(olddescription);
        user.setVisible(oldvisible);
        // 将User对象序列化为JSON字符串
        String json;
        try {
            json = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "更改图层位置失败！";
        }

        // 将JSON字符串写回文件
        try {
            FileUtils.writeStringToFile(new File(FilePath), json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return "更改图层位置失败！";
        }
        return "更改图层位置成功！";
    }

    //    实现元素交换
    public static <T> void shiftElement(List<T> list, int index) {
        // 检查索引是否有效
        if (index >= 0 && index < list.size() - 1) {
            // 将元素后移一个位置
            T temp = list.get(index);
            list.set(index, list.get(index + 1));
            list.set(index + 1, temp);
        }
    }
}
