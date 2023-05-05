package com.example.back_end.config;

import com.example.back_end.inteceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry){
//        增加拦截类
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns();
//        添加拦截器
//        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/user/**");
    }
}
