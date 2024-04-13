package com.example.rabc_backend.controller;

import com.example.rabc_backend.mapper.UserMapper;
import com.example.rabc_backend.model.*;
import com.example.rabc_backend.note.AuthToken;
import com.example.rabc_backend.service.AccountService;
import com.example.rabc_backend.service.UserService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

@CrossOrigin
@AuthToken
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AccountService accountService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Value("${jwt.refresh_token.expiration}")
    private Long refreshTokenExpiration;
    @PostMapping("/login")
    public CommonResult<?> login(@RequestBody LoginRequest loginUser) {

        try{
            Account account = accountService.getAccountByAccount(loginUser.getUsername());

            if (!loginUser.getPassword().equals(account.getPassword())) {
                return CommonResult.error(50007,"登录失败，账号密码不正确");
            }
        }catch (Exception e){
            return CommonResult.error(50007,"登录失败，账号密码不正确");
        }

        String username = loginUser.getUsername();

        // 生成访问令牌和刷新令牌
        String accessToken = jwtTokenUtil.generateAccessToken(username);
        String refreshToken = jwtTokenUtil.generateRefreshToken(username);

        TokenResponse token_resp = new TokenResponse(accessToken,refreshToken);

        CommonResult<TokenResponse> result = CommonResult.success(token_resp);

        return result;
    }

    @GetMapping("/profile/get")
    public CommonResult<?> getUserProfile(@RequestHeader("Authorization") String authHeader) {
        System.out.println("正在根据token查询用户名……");
        // 解析Authorization请求头中的JWT令牌 Bearer access_token
        String token = authHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        CommonResult<String> result = CommonResult.success(username);
        return result;
    }
    @GetMapping("/reloadtoken")
    public CommonResult<?> reloadToken(@RequestHeader("REFRESHTOKEN") String refreshtoken){
        System.out.println("查询刷新条件……，refreshToken："+refreshtoken);
        refreshtoken=refreshtoken.substring(7);
        String username=jwtTokenUtil.getUsernameFromToken(refreshtoken);
        if(username.length()>0&&redisTemplate.hasKey(refreshtoken)){
            // 如果token合法，删除旧的访问令牌，生成新的访问令牌，重置刷新令牌的时间
            System.out.println("根据refresh_token刷新access_token");
            String accessToken = jwtTokenUtil.generateAccessToken(username);
            redisTemplate.expire(refreshtoken, refreshTokenExpiration,TimeUnit.SECONDS);
            TokenResponse token_resp = new TokenResponse(accessToken,refreshtoken);

            CommonResult<TokenResponse> result = CommonResult.success(token_resp);
            return result;
        }
        else{
//            通过jwtTokenUtil判断token是否有效，进而判断能否进行刷新
            return CommonResult.error(401,"刷新失败");
        }
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/id:{userId}")
    public User getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/account:{account}")
    public List<User> getUserByAccount(@PathVariable String account) {
        return userService.getUserByAccount(account);
    }

    @PostMapping("/")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @PutMapping("/")
    public void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
    }
}

//    private final UserService userService;
//    @PostMapping("/{account}+{password}")
//    public String getUserById(@PathVariable String account,@PathVariable String password) {
//        return userService.getUserById(account,password);
//    }
//
//    @GetMapping("/{account}")
//    public User getUserName(@PathVariable String account) {
//        return userService.getUserName(account);
//    }

