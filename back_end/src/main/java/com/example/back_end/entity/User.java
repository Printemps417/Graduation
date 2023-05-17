package com.example.back_end.entity;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.json.JSONObject;

public class User {
    private String account;
    private String password;

    private List<String> database;
    private List<String> action;
    private List<String> datas;
    private List<String> layers;
    private List<String> description;


    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public User(@JsonProperty("account") String account,
                @JsonProperty("password") String password,
                @JsonProperty("database") List<String> database,
                @JsonProperty("actions") List<String> action,
                @JsonProperty("datas") List<String> datas,
                @JsonProperty("layers") List<String> layers,
                @JsonProperty("description") List<String> description) {
        this.account = account;
        this.password = password;
        this.database=database;
        this.action = action;
        this.datas = datas;
        this.layers=layers;
        this.description=description;
    }
//    构造函数，用做将json文件赋值给user

    public void setDatabase(List<String> database) {
        this.database = database;
    }

    public List<String> getDatabase() {
        return database;
    }

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

    public void setLayers(List<String> layers) {
        this.layers = layers;
    }

    public List<String> getLayers() {
        return layers;
    }

    public List<String> getDatas() {
        return datas;
    }

    public void setDatas(List<String> datas) {
        this.datas = datas;
    }

    public void setDescription(List<String> description) {
        this.description = description;
    }

    public List<String> getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return "User{" +
                "account='" + account + '\'' +
                ", password='" + password + '\'' +
                ", database=" + database +
                ", action=" + action +
                ", datas=" + datas +
                ", layers=" + layers +
                ", description=" + description +
                '}';
    }
}
