package com.example.back_end.entity;

import com.baomidou.mybatisplus.annotation.TableName;

@TableName("websites")
//若表名和类名不同，标注表名
public class websites {
    private int id;
    private String name;
    private String url;
    private String alexa;
    private String sal;
    private String country;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAlexa() {
        return alexa;
    }

    public void setAlexa(String alexa) {
        this.alexa = alexa;
    }

    public String getSal() {
        return sal;
    }

    public void setSal(String sal) {
        this.sal = sal;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "website{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", alexa='" + alexa + '\'' +
                ", sal='" + sal + '\'' +
                ", country='" + country + '\'' +
                '}';
    }
}
