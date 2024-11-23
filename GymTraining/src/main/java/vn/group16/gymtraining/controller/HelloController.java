package vn.group16.gymtraining.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.group16.gymtraining.util.error.IdInvalidException;

@RestController
public class HelloController {
    @GetMapping("/")
    public String getHelloWorld() {
        return "Update";
    }
}
