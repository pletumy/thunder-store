package com.ueh.thunderstoreadmin.security.service;

import com.ueh.thunderstoreadmin.cart.model.CCart;
import com.ueh.thunderstoreadmin.role.model.CRole;
import com.ueh.thunderstoreadmin.role.repository.CRoleRepository;
import com.ueh.thunderstoreadmin.security.CRefreshTokenRepository;
import com.ueh.thunderstoreadmin.security.dto.LoginDTO;
import com.ueh.thunderstoreadmin.security.dto.SignUpDTO;
import com.ueh.thunderstoreadmin.security.jwt.JwtHelper;
import com.ueh.thunderstoreadmin.security.model.CRefreshToken;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsWithTokenDTO;
import com.ueh.thunderstoreadmin.user.mapper.CUserMapper;
import com.ueh.thunderstoreadmin.user.model.CUser;
import com.ueh.thunderstoreadmin.user.model.UserStatus;
import com.ueh.thunderstoreadmin.user.repository.CUserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

/**
 * @author TuMy
 */
@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private CRoleRepository roleRepository;

    @Autowired
    private CUserRepository userRepository;

    @Autowired
    private CRefreshTokenRepository refreshTokenRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public CUserDetailsWithTokenDTO login(LoginDTO dto, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword());
        Authentication auth;
        try{
            auth = authenticationManager.authenticate(authentication);
        }catch (Exception e){
            return null;
        }

        if (auth == null)
            return null;

        Collection<SimpleGrantedAuthority> authorities = (Collection<SimpleGrantedAuthority>) auth.getAuthorities();

        String token = jwtHelper.generateTokenWithUsernameAndRoles(dto.getUsername(), authorities);

        if (token == null)
            return null;

        Optional<CUser> userOpt = userRepository.findByUsername(dto.getUsername());

        if(userOpt.isEmpty())
            return null;
        CUser user = userOpt.get();
        CUserDetailsDTO userDetails =  CUserMapper.INSTANCE.toUserDetailsDTO(user);
        userDetails.setCartId(user.getCart().getId());

        //Set Refresh token for client
        String refreshTokenString = jwtHelper.generateRefreshTokenWithUsernameAndRoles(userDetails.getUsername(),authorities);
        CRefreshToken refreshTokenEntity = CRefreshToken.builder().refreshToken(refreshTokenString).user(user).build();
        refreshTokenRepository.save(refreshTokenEntity);

        ResponseCookie cookie = ResponseCookie.from("refreshToken",refreshTokenString)
                .httpOnly(true)
                .secure(true)
                .maxAge(30 * 24 * 60 * 60 )
                .sameSite("NONE")
                .path("/")
                .domain("localhost")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return CUserDetailsWithTokenDTO.builder().userDetail(userDetails).token(token).build();
    }
    @Override
    public boolean signup(SignUpDTO dto) {
        Optional<CRole> defaultRole = roleRepository.findByCode("ROLE_USER");
        Set<CRole> roles = new LinkedHashSet<CRole>();
        roles.add(defaultRole.get());


        CUser newUser = CUser.builder()
                .displayName(dto.getUsername())
                .username(dto.getUsername())
                .phone(dto.getPhone())
                .password(passwordEncoder.encode(dto.getPassword()))
                .email(dto.getEmail())
                .roles(roles)
                .cart(CCart.builder().total(BigDecimal.valueOf(0)).numOfProduct(0).build())
                .status(UserStatus.ACTIVE)
                .build();
        try {
            userRepository.save(newUser);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public void logout(String refreshToken) {
        Optional<CRefreshToken> refreshTokenOpt = refreshTokenRepository.findByRefreshToken(refreshToken);
        if(refreshTokenOpt.isEmpty())
            return;
        try{
            refreshTokenRepository.delete(refreshTokenOpt.get());
        }catch(Exception e){

        }
    }
}