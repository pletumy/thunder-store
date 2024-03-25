package com.ueh.thunderstoreadmin.security.provider;

import com.ueh.thunderstoreadmin.security.jwt.JwtHelper;
import com.ueh.thunderstoreadmin.user.model.CUser;
import com.ueh.thunderstoreadmin.user.repository.CUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

/**
 * @author TuMy
 */
@Component
public class CustomAuthenProvider implements AuthenticationProvider {
    @Autowired
    private CUserRepository userRepository;

    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtHelper jwtHelper;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        Optional<CUser> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty())
            return null;

        CUser user = userOpt.get();
        UsernamePasswordAuthenticationToken token = null;
        if (passwordEncoder.matches(password, userOpt.get().getPassword())) {
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
            user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getCode())));

            token = new UsernamePasswordAuthenticationToken(username,"",authorities);
        }

        return token;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
