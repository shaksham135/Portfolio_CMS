package com.shaksham.portfolio.repository;

import com.shaksham.portfolio.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
    List<ContactMessage> findByIsReadFalseOrderByCreatedAtDesc();
    long countByIsReadFalse();
}
