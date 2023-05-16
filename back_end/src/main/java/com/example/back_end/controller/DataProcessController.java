package com.example.back_end.controller;
import com.example.back_end.entity.WebData;
import com.example.back_end.mapper.UserMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.opencsv.CSVWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class DataProcessController {
    @Autowired
    private UserMapper userMapper;
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
}
