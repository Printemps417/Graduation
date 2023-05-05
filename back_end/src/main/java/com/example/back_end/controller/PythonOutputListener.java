package com.example.back_end.controller;

import org.apache.commons.io.input.TailerListenerAdapter;

public class PythonOutputListener extends TailerListenerAdapter {
    @Override
    public void handle(String line) {
        System.out.println(line);
    }
}