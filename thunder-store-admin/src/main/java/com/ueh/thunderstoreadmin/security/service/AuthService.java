package com.ueh.thunderstoreadmin.security.service;

import com.ueh.thunderstoreadmin.security.dto.LoginDTO;
import com.ueh.thunderstoreadmin.security.dto.SignUpDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsWithTokenDTO;
import jakarta.servlet.http.HttpServletResponse;

/**
 * @author TuMy
 */
public interface AuthService {
    CUserDetailsWithTokenDTO login(LoginDTO dto, HttpServletResponse response);

    boolean signup(SignUpDTO dto);

    void logout(String refreshToken);
}
