package com.ueh.thunderstoreadmin.user.repository;

import com.ueh.thunderstoreadmin.user.model.CUserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author TuMy
 */
@Repository
public interface CUserAddressRepository extends JpaRepository<CUserAddress,String> {
}
