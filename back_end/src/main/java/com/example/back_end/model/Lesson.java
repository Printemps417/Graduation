package com.example.rabc_backend.model;

import lombok.Data;

@Data
public class Lesson {
    private int id;
    private String name;
    private String teacher;
    private String time;
    private int choosennum;
    private int maxnum;
}
