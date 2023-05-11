package com.example.back_end.entity;
import java.util.List;
import org.json.JSONObject;

public class User {
    private String account;
    private String password;
    private List<String> action;
    private JSONObject datas;

    public User(String account, String password, List<String> action, JSONObject datas) {
        this.account = account;
        this.password = password;
        this.action = action;
        this.datas = datas;
    }
//    构造函数，用做将json文件赋值给user

    public void setAccount(String account) {
        this.account = account;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAction(List<String> action) {
        this.action = action;
    }

    public void setDatas(JSONObject datas) {
        this.datas = datas;
    }

    @Override
    public String toString() {
        return "User{" +
                "account='" + account + '\'' +
                ", password='" + password + '\'' +
                ", action=" + action +
                ", datas=" + datas +
                '}';
    }
}
