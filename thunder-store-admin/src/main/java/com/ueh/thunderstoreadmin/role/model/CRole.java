package com.ueh.thunderstoreadmin.role.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ueh.thunderstoreadmin.common.model.BaseEntity;
import com.ueh.thunderstoreadmin.user.model.CUser;
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
@Entity
@NoArgsConstructor
@Table(name = "c_role")
public class CRole extends BaseEntity {
    @Column(name="code",nullable = false,unique = true)
    private String code;

    @Column(name="description")
    private String description;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles",fetch = FetchType.EAGER)
    private Set<CUser> users = new LinkedHashSet<CUser>();
}

