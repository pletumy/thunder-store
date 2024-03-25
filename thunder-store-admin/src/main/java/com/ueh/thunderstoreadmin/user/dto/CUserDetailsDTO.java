package com.ueh.thunderstoreadmin.user.dto;

import com.ueh.thunderstoreadmin.user.annotation.UniqueEmail;
import com.ueh.thunderstoreadmin.user.annotation.UniqueUsername;
import com.ueh.thunderstoreadmin.user.model.CUserAddress;
import com.ueh.thunderstoreadmin.user.model.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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
public class CUserDetailsDTO {
    private String id;

    @NotBlank(message="{user.username.notBlank}")
    @UniqueUsername(message="{user.username.existed}")
    private String username;

    @NotBlank
    private String displayName;
    private String firstName;
    private String lastName;

    @Email(message = "{user.email.notEmailType}")
    @UniqueEmail(message="{user.email.existed}")
    private String email;
    private String avatar;

    //phone vietnam
    @Pattern(regexp = "(84|0[3|5|7|8|9])[0-9]{8}\\b",message = "{user.phone.validPhoneNumber}")
    private String phone;

    @NotBlank
    private UserStatus status;
    private List<CUserAddress> userAddress;
    private String cartId;
}
