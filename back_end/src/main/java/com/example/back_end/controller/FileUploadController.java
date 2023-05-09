package com.example.back_end.controller;

import com.example.back_end.entity.WebData;
import com.example.back_end.mapper.UserMapper;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;


@RestController
@CrossOrigin
public class FileUploadController {
//    @PostMapping("/upload")
    public String file_path=null;
    public String dbname=null;
    @ApiOperation("此接口用于上传用户文件")
    @RequestMapping(value = "/upload/**",method = RequestMethod.POST)
    public String upload(MultipartFile userFile, HttpServletRequest request) throws IOException{
//        通过request获得上下文对象（服务器），通过上下文获得路径（动态获取）
        System.out.println(userFile.getOriginalFilename());
//        取文件的原始名称
        System.out.println(userFile.getContentType());
//        取文件类型
        String path=request.getServletContext().getRealPath("/upload/");
//        在服务器中新建upload文件夹保存静态数据
        System.out.println(path);
//        打印动态路径
        saveFile(userFile,path);//将数据存储到服务器
//        inputFile(this.file_path,this.dbname);
        return "UPLOAD SUCCESSFULLY!";
    }

    @ApiOperation("此接口用于向数据库导入用户文件")
    @RequestMapping(value = "/input/**",method = RequestMethod.POST)
    public String input(HttpServletRequest request) throws IOException{
        inputFile(this.file_path,this.dbname);
        return "INPUT SUCCESSFULLY!";
    }

    public void saveFile(MultipartFile userFile, String path) throws IOException{
        File dir = new File(path);//查看文件夹是否存在
        if(!dir.exists()){
            dir.mkdir();
//            若不存在路径则创造路径
        }
        File file=new File(path+userFile.getOriginalFilename());
        this.file_path=path+userFile.getOriginalFilename();
        System.out.println(this.file_path);
        this.dbname=userFile.getOriginalFilename();
        this.dbname=this.dbname.substring(0,this.dbname.indexOf('.'));
        System.out.println(this.dbname);
//        保存用户数据在服务器中的路径
        userFile.transferTo(file);
    }

    public void inputFile(String path,String dbname) throws IOException{
        try {
            String[] args1 = new String[] { "python", "E:\\local_repository\\Graduation\\back_end\\src\\main\\resources\\Static\\SqlInput.py", dbname, path };
            Process proc = Runtime.getRuntime().exec(args1);// 执行py文件
            proc.getOutputStream().flush();
            BufferedReader reader = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            reader监听python输出缓冲区数据
//            创建一个新的线程来读取Python脚本的输出
            Thread outputThread = new Thread(() -> {
                try {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        System.out.println(line);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    try {
                        reader.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            });
            outputThread.start();

            // 等待Python脚本执行完成
            int exitCode = proc.waitFor();
            if (exitCode == 0) {
                System.out.println("Python脚本执行成功");
            } else {
                System.out.println("Python脚本执行失败");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private UserMapper userMapper;
//    Spring功能，将实例化的对象注入userMapper
//增删改查
    @ApiOperation("此接口用于查询全部数据")
    @GetMapping("/webdata")
    public List query(String databasename,String tablename){
        this.dbname=databasename;
//        更新查询数据库名
        System.out.println("用户查询数据库为"+databasename);
        List<WebData> list= userMapper.getall(databasename,tablename);
        System.out.println(list);
        return list;
    }
    //    查询用户信息
    @ApiOperation("此接口添加数据")
    @PostMapping("/webdata")
    public String AddData(String dbname,WebData web){
        System.out.println(web);
        int i=userMapper.add(web);
        if(i>0) return "添加成功！";
        else return "插入失败！";
    }
//    添加用户信息

    @ApiOperation("此接口用于根据ID更新数据")
    @PutMapping("/webdata")
    public String Updatainfo(String dbname,WebData web){
        System.out.println("更新车辆编号为："+web.getId());
        int i=userMapper.updatedata(web);
        if(i>0) return "更新成功！";
        else return "更新失败！";
    }
    //    更新用户信息，传入类

    @ApiOperation("此接口用于根据ID删除数据")
    @DeleteMapping("/webdata")
    public String DelData(String dbname,int id){
        System.out.println("删除网站id为："+id);
        int i=userMapper.deletedata(id);
        if(i>0) return "删除成功！";
        else return "删除失败！";
    }
//    删除用户信息

    @ApiOperation("此接口用于根据ID查询数据")
    @GetMapping("/webdata/{id}")
    public List findById(String dbname,int id){
        List<WebData> list= userMapper.findById(id);
        System.out.println(list);
        return list;
    }
}
