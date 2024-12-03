package vn.group16.gymtraining.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import vn.group16.gymtraining.domain.Role;
import vn.group16.gymtraining.domain.User;
import vn.group16.gymtraining.repository.RoleRepository;

@Service
public class RoleService {
    final private RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role createRole(Role role) {
        return this.roleRepository.save(role);
    }
}
