package com.ueh.thunderstoreadmin.security.model;

import com.ueh.thunderstoreadmin.user.model.CUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * @author TuMy
 */
@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@Entity
@Table(name = "c_refresh_token")
public class CRefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id",columnDefinition = "VARCHAR(36)")
    private String id;
    @Column(name="refresh_token",nullable = false,unique = true)
    private String refreshToken;

    @ManyToOne
    @JoinColumn(name="user_id")
    private CUser user;
}
