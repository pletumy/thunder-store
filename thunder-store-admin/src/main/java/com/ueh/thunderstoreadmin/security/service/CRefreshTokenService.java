package com.ueh.thunderstoreadmin.security.service;

/**
 * @author TuMy
 */
public interface CRefreshTokenService {
    String getToken(String refreshTokenString);
}
