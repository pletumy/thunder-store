package com.ueh.thunderstoreadmin.security.annotation;

import com.ueh.thunderstoreadmin.role.model.CRole;
import com.ueh.thunderstoreadmin.user.model.CUser;
import com.ueh.thunderstoreadmin.user.repository.CUserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * @author TuMy
 */

public class AdminUsernameCheckedValidator  implements ConstraintValidator<AdminUsernameChecked, String> {
    @Autowired
    private CUserRepository userRepository;
    private String message;

    @Override
    public void initialize(AdminUsernameChecked usernameChecked) {
        message = usernameChecked.message();
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        Optional<CUser> userOptional = userRepository.findByUsername(username);
        if(userOptional.isEmpty())
            return false;

        CUser user = userOptional.get();
        CRole userRole = user.getRoles().stream().filter(role -> role.getCode().equals("ROLE_ADMIN")).findFirst().orElse(null);
        if(userRole != null)
            return true;

        return false;
    }
}