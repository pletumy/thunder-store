package com.ueh.thunderstoreadmin.user.dto;

import com.ueh.thunderstoreadmin.user.annotation.UniqueEmail;
import com.ueh.thunderstoreadmin.user.annotation.UniqueUsername;
import com.ueh.thunderstoreadmin.user.model.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
public class CUserDTO {
    @NotBlank(message="{user.username.notBlank}")
    @UniqueUsername(message="{user.username.existed}")
    private String username;

    @NotBlank
    private String displayName;

    @Email(message = "{user.email.notEmailType}")
    @UniqueEmail(message="{user.email.existed}")
    private String email;

    private UserStatus status;
}
