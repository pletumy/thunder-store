package com.ueh.thunderstoreadmin.user.dto;

import com.ueh.thunderstoreadmin.role.model.CRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class CUserDetailsAndRolesDTO {
    private CUserDetailsDTO userDetails;
    private List<CRole> roles;
}
