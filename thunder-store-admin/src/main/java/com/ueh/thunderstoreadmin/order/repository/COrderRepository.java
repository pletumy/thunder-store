package com.ueh.thunderstoreadmin.order.repository;

import com.ueh.thunderstoreadmin.order.model.COrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author TuMy
 */
@Repository
public interface COrderRepository extends JpaRepository<COrder,String> {
    @Query("Select o from COrder o LEFT JOIN o.user u where u.id = ?1")
    List<COrder> findAllByUser(String userId);
}
