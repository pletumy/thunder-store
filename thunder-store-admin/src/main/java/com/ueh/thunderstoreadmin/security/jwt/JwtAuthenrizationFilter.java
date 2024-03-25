package com.ueh.thunderstoreadmin.security.jwt;

import com.ueh.thunderstoreadmin.security.dto.UsernameAndRoles;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * @author TuMy
 */
@Component
public class JwtAuthenrizationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtHelper helper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = helper.getToken(request);
        try{
            if(helper.validationJwt(token)){
                UsernameAndRoles currentUser = helper.getUsernameAndRoleFromToken(token);
                Authentication auth = new UsernamePasswordAuthenticationToken(currentUser.getUsername(),"",currentUser.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }catch (Exception ex){
            response.setHeader("Error",ex.getMessage());
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }

        filterChain.doFilter(request, response);
    }
}
