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
public class FileUploadController {
//    @PostMapping("/upload")
    public String file_path=null;
    public String dbname=null;
    public String terminalout="后端Terminal信息： \n  ……";
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
            String StaticPath="E:\\local_repository\\Graduation\\back_end\\src\\main\\resources\\Static";
//            资源路径
            String FilePath=StaticPath+"\\SqlInput.py";
            String[] args1 = new String[] { "python", FilePath, dbname, path };
//            String[] args1 = new String[] { "python", "E:\\local_repository\\Graduation\\back_end\\src\\main\\resources\\Static\\SqlInput.py", dbname, path };
            Process proc = Runtime.getRuntime().exec(args1);// 执行py文件
            proc.getOutputStream().flush();
            this.terminalout="后端Terminal信息：正在启动数据库导入程序……";
            BufferedReader reader = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            reader监听python输出缓冲区数据
//            创建一个新的线程来读取Python脚本的输出
            Thread outputThread = new Thread(() -> {
                try {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        System.out.println(line);
                        this.terminalout=this.terminalout+"   |...Done...|   "+line;
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
                this.terminalout="后端Terminal信息：  数据库导入程序结束，数据导入成功！";
            } else {
                System.out.println("Python脚本执行失败");
                this.terminalout="后端Terminal信息：  程序运行失败，请检查数据格式规范";
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private UserMapper userMapper;
//    Spring功能，将实例化的对象注入userMapper
//CRUD操作
    @ApiOperation("此接口用于查询某一数据表内容")
    @GetMapping("/gettabledata")
    public List query(String databasename,String tablename){
        this.dbname=databasename;
//        更新查询数据库名
        System.out.println("用户查询数据表为"+tablename);
        List<WebData> list= userMapper.getall(databasename,tablename);
        System.out.println(list);
        return list;
    }
    //    根据数据库名和数据表名查询数据

    @ApiOperation("此接口用于查询库中全部表名称")
    @GetMapping("/gettablename")
    public List queryname(String databasename){
        this.dbname=databasename;
//        更新查询数据库名
        System.out.println("用户查询数据库为"+databasename);
        List<String> list= userMapper.gettablename(databasename);
        System.out.println(list);
        return list;
    }
//    查询库内表名

    @ApiOperation("此接口用于查询数据库列表")
    @GetMapping("/getdbname")
    public List querydbname(){
        System.out.println("用户查询数据库");
        List<String> list= userMapper.getdbname();
        System.out.println(list);
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

    @ApiOperation("此接口用于查询终端信息")
    @GetMapping("/getTerminal")
    public String queryTerminal(){
//        System.out.println("接收到终端查询请求");
//        String res=readTerminal();
//        System.out.println("Terminal Updating……");
        return this.terminalout;
    }


}
