package com.example.back_end.entity;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.json.JSONObject;

public class User {
    private String account;
    private String password;
    private List<String> action;
    private JSONObject datas;
    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public User(@JsonProperty("account") String account,
                @JsonProperty("password") String password,
                @JsonProperty("actions") List<String> action,
                @JsonProperty("datas") JSONObject datas) {
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

    public String getAccount() {
        return account;
    }

    public String getPassword() {
        return password;
    }

    public List<String> getAction() {
        return action;
    }

    public JSONObject getDatas() {
        return datas;
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
