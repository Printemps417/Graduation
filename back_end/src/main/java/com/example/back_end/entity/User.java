package com.example.back_end.entity;

public class User {
    private String username;
    private String password;
    public String getUsername(){
        return this.username;
    }
    public void setUsername(String username){
        this.username=username;
    }
    public String getPassword(){
        return this.password;
    }
    public void setPassword(String password){
        this.password=password;
    }

    @Override
    public String toString(){
        return "username:"+username+"\n"+"password:"+password
                +"\nGain Objection successfully!";
    }

}