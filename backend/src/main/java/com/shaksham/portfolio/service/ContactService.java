package com.shaksham.portfolio.service;

import com.shaksham.portfolio.dto.ContactRequest;
import com.shaksham.portfolio.entity.ContactMessage;
import com.shaksham.portfolio.exception.ResourceNotFoundException;
import com.shaksham.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessage submitMessage(ContactRequest req) {
        ContactMessage msg = ContactMessage.builder()
                .name(req.getName())
                .email(req.getEmail())
                .subject(req.getSubject())
                .message(req.getMessage())
                .isRead(false)
                .build();
        return contactMessageRepository.save(msg);
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<ContactMessage> getUnreadMessages() {
        return contactMessageRepository.findByIsReadFalseOrderByCreatedAtDesc();
    }

    public long getUnreadCount() {
        return contactMessageRepository.countByIsReadFalse();
    }

    public ContactMessage markAsRead(Long id) {
        ContactMessage msg = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message", id));
        msg.setIsRead(true);
        return contactMessageRepository.save(msg);
    }

    public void delete(Long id) {
        ContactMessage msg = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message", id));
        contactMessageRepository.delete(msg);
    }
}
