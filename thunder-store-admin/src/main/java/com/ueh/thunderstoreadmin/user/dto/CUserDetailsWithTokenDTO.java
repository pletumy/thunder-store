package com.ueh.thunderstoreadmin.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * @author TuMy
 */
@Setter
@Getter
@Builder
public class CUserDetailsWithTokenDTO {
    private CUserDetailsDTO userDetail;
    private String token;
}
