package com.example.back_end.config;//package com.example.myspringboot.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class CorsConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry){
////        registy注册
//        registry.addMapping("/**") //允许跨域访问的控制器的路径
//                .allowedOrigins("*")
//                .allowedMethods("POST","GET","PUT","OPTIONS","DELETE")
//                .maxAge(168000)//预检间隔时间
//                .allowedHeaders("*")//允许头部设置
//                .allowCredentials(true);//是否发送cookie
////        精细化控制：类中配置，控制器内加注解 全局配置：加控制类（如上），全局配置
//    }
//}
