package com.example.back_end.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ControllerTest {
    public static void main(String[] args) throws IOException, InterruptedException {
//            PythonInterpreter interpreter = new PythonInterpreter();
//            interpreter.exec("import sys; ");
//            interpreter.exec("a='hello world'; ");
//            interpreter.exec("print a;");
            // TODO Auto-generated method stub
        try {
//            String[] args1 = new String[] { "python", "E:\\WebSet\\myspringboot\\src\\main\\resources\\static\\SqlInput.py", "timeData3_06_07", "E:\\SRTP数据\\3\\timeData3_06-07.csv" };
            String[] args1 = new String[] { "python", "E:\\WebSet\\myspringboot\\src\\main\\resources\\static\\test.py",String.valueOf(13), String.valueOf(12) };
            Process proc = Runtime.getRuntime().exec(args1);// 执行py文件

            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            String line = null;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
            proc.waitFor();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
}
