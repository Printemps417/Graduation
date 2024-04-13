package com.example.rabc_backend.Interceptor;

import com.example.rabc_backend.model.CommonResult;
import com.example.rabc_backend.model.JwtTokenUtil;
import com.example.rabc_backend.note.AuthToken;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AuthTokenInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public boolean CheckToken(String token) {
        // 解析Authorization请求头中的JWT令牌 Bearer access_token

        System.out.println(token);
        String username ="";
        try{
            username=jwtTokenUtil.getUsernameFromToken(token);
            System.out.println(username);
        }catch(JwtException | IllegalArgumentException e){
            System.out.println(e);
            return false;
        }
        if(username.length()>0){
            return true;
        }
        else{
            return false;
        }
    }
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 检查注解
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            AuthToken authTokenClass = handlerMethod.getBeanType().getAnnotation(AuthToken.class);
            AuthToken authTokenMethod = handlerMethod.getMethod().getAnnotation(AuthToken.class);

            // 如果方法或类上标记了注解
            if (authTokenMethod != null || authTokenClass != null) {
                System.out.println("拦截器响应！");
                // 从请求中获取Access Token
                String accessToken = request.getHeader("Authorization").substring(7);
//                System.out.println(accessToken);
                // 验证Access Token
                if (accessToken != null && redisTemplate.hasKey(accessToken)) {
//                    redisTemplate.hasKey(accessToken):有该token。这里要验证token
                    if(CheckToken(accessToken)){
                        return true;
                    }
                    else{
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        return false;
                    }
                } else {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                    返回未授权的状态码
                    return false;
                }
            }
        }
        return true;
    }
}
