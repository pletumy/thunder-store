package com.ueh.thunderstoreadmin.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * @author TuMy
 */
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class CUserAddressDTO {
    private String id;
    @NotBlank
    private String address;
    @NotBlank
    private String district;
    @NotBlank
    private String ward;
    @NotBlank
    private String city;
    private boolean defaultAddress;
}
