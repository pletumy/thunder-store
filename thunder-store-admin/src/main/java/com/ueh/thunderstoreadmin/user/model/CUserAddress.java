package com.ueh.thunderstoreadmin.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name="C_user_address")
public class CUserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id",unique=true,columnDefinition = "VARCHAR(36)")
    protected String id;

    @Column(name = "address")
    private String address;

    @Column(name = "district")
    private String district;

    @Column(name = "ward")
    private String ward;

    @Column(name = "city")
    private String city;

    @Column(name="is_default")
    private boolean defaultAddress;

    @JsonIgnore
    @ManyToOne(targetEntity = CUser.class,fetch = FetchType.LAZY)
    @JoinColumn(name="user_id",nullable = false)
    private CUser user;
}
