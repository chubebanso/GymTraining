package vn.group16.gymtraining.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.group16.gymtraining.domain.Role;
import vn.group16.gymtraining.service.RoleService;

@RestController
@RequestMapping("/api/v1")
public class RoleController {
    final private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/create/role")
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.roleService.createRole(role));
    }
}
