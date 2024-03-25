package com.ueh.thunderstoreadmin.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ueh.thunderstoreadmin.cart.model.CCart;
import com.ueh.thunderstoreadmin.common.model.BaseEntity;
import com.ueh.thunderstoreadmin.role.model.CRole;
import com.ueh.thunderstoreadmin.security.model.CRefreshToken;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.LinkedHashSet;
import java.util.Set;

/**
 * @author TuMy
 */
@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@Entity
@Table(name="c_user")
public class CUser extends BaseEntity {
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(
            name="C_user_role",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id")
    )
    private Set<CRole> roles = new LinkedHashSet<CRole>();


    @Column(name = "username",unique = true,nullable = false,length=100)
    private String username;

    @JsonIgnore
    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "display_name",nullable = false)
    private String displayName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email",nullable = false,unique = true,length = 255)
    private String email;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "phone")
    private String phone;

    @Column(name = "status",nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    private CCart cart;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "user",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private Set<CRefreshToken> refreshTokens = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private Set<CUserAddress> userAddress = new LinkedHashSet<CUserAddress>();

    public void addAddress(CUserAddress address){
        userAddress.add(address);
        setDefaultAddress(address);

        address.setUser(this);
    }
    public void setDefaultAddress(CUserAddress  address) {
        CUserAddress defaultAddress = userAddress.stream().filter(a -> a.isDefaultAddress())
                .findFirst()
                .orElse(null);
        if(defaultAddress != null) defaultAddress.setDefaultAddress(false);
        address.setDefaultAddress(true);
    }

    public void addRole(CRole role){
        roles.add(role);
        role.getUsers().add(this);
    }
    public void removeRole(CRole role){
        roles.remove(role);
        role.getUsers().remove(this);
    }
}
