package com.ueh.thunderstoreadmin.security;

import com.ueh.thunderstoreadmin.security.model.CRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author TuMy
 */
@Repository
public interface CRefreshTokenRepository  extends JpaRepository<CRefreshToken,String> {
    Optional<CRefreshToken> findByRefreshToken(String refreshTokenString);
}
