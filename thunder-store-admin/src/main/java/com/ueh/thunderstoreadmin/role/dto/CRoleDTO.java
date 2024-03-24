package com.ueh.thunderstoreadmin.role.dto;

import com.ueh.thunderstoreadmin.role.validation.UniqueCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
public class CRoleDTO {
    public String id;

    @NotBlank
    @Size(min = 6,max = 32,message = "{role.code.size}")
    @UniqueCode
    public String code;

    @NotBlank(message = "{role.description.notBlank}")
    public String description;
}
