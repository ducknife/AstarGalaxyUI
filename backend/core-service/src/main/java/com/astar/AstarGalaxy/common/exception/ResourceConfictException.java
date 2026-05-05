package com.astar.AstarGalaxy.common.exception;

public class ResourceConfictException extends AppException{
    public ResourceConfictException(String message) {
        super(409, message);
    }
}
