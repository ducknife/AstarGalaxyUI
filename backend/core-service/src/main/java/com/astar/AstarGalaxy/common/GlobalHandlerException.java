package com.astar.AstarGalaxy.common;

import org.springframework.security.core.AuthenticationException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.astar.AstarGalaxy.common.exception.AppException;
import com.mongodb.DuplicateKeyException;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalHandlerException {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<?>> handleAppException(AppException e) {
        log.error("AppException: ", e);
        return ApiResponse.error(e.getErrorCode(), e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("MethodArgumentNotValidException: ", e);
        return ApiResponse.error(400, e.getMessage());
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ApiResponse<?>> handleDuplicateKey(DuplicateKeyException e) {
        return ApiResponse.error(409, "Dữ liệu đã tồn tại trong hệ thống (Bắt ngay khi repo ăn bom từ DB)");
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNoResourceFoundException(NoHandlerFoundException e) {
        return ApiResponse.error(404, "Đường dẫn " + e.getRequestURL() + " không tồn tại!");
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<?>> handleAuthenticationException(AuthenticationException e) {
        String message = "Xác thực không thành công";
        if (e instanceof BadCredentialsException) {
            message = "Tài khoản hoặc mật khẩu không chính xác";
        }
        return ApiResponse.error(401, message);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<?>> handleAccessDeniedException(AccessDeniedException e) {
        return ApiResponse.error(403, "Bạn không có quyền truy cập vào tài nguyên này");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleException(Exception e) {
        log.error("Exception: ", e);
        return ApiResponse.error(500, e.getMessage());
    }
}
