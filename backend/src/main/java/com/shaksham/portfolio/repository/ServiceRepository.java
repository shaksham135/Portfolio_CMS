package com.shaksham.portfolio.repository;

import com.shaksham.portfolio.entity.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<ServiceItem, Long> {
    List<ServiceItem> findAllByOrderByDisplayOrderAsc();
}
