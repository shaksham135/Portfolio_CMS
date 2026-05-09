package com.shaksham.portfolio.service;

import com.shaksham.portfolio.dto.ServiceRequest;
import com.shaksham.portfolio.entity.ServiceItem;
import com.shaksham.portfolio.exception.ResourceNotFoundException;
import com.shaksham.portfolio.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceItemService {

    private final ServiceRepository serviceRepository;

    public List<ServiceItem> getAll() {
        return serviceRepository.findAllByOrderByDisplayOrderAsc();
    }

    public ServiceItem create(ServiceRequest req) {
        ServiceItem item = ServiceItem.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .icon(req.getIcon())
                .displayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : 0)
                .build();
        return serviceRepository.save(item);
    }

    public ServiceItem update(Long id, ServiceRequest req) {
        ServiceItem item = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", id));
        item.setTitle(req.getTitle());
        item.setDescription(req.getDescription());
        item.setIcon(req.getIcon());
        if (req.getDisplayOrder() != null) item.setDisplayOrder(req.getDisplayOrder());
        return serviceRepository.save(item);
    }

    public void delete(Long id) {
        ServiceItem item = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", id));
        serviceRepository.delete(item);
    }
}
