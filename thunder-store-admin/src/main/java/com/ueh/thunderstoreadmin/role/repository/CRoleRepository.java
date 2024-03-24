package com.ueh.thunderstoreadmin.role.repository;

import com.ueh.thunderstoreadmin.role.model.CRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author TuMy
 */
public interface CRoleRepository extends JpaRepository<CRole, String> {
    Optional<CRole> findByCode(String code);
}
