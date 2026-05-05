package com.astar.AstarGalaxy.common.exception;

public class InvalidRequestException extends AppException {
    public InvalidRequestException(String message) {
        super(400, message);
    }
}
