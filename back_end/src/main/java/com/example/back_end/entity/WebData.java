package com.example.back_end.entity;

public class WebData {
    private int index;
    private int id;
    private String time;
    private String lon;
    private String lat;
    private String if_empty;
    private String speed;

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public WebData(int index, int id, String time, String lon, String lat, String if_empty, String speed) {
        this.index = index;
        this.id = id;
        this.time = time;
        this.lon = lon;
        this.lat = lat;
        this.if_empty = if_empty;
        this.speed = speed;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getIf_empty() {
        return if_empty;
    }

    public void setIf_empty(String if_empty) {
        this.if_empty = if_empty;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    @Override
    public String toString() {
        return "WebData{" +
                "index=" + index +
                ", id=" + id +
                ", time='" + time + '\'' +
                ", lon='" + lon + '\'' +
                ", lat='" + lat + '\'' +
                ", if_empty='" + if_empty + '\'' +
                ", speed='" + speed + '\'' +
                '}';
    }
}
