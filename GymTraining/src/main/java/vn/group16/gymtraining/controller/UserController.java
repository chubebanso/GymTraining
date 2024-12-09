package vn.group16.gymtraining.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import vn.group16.gymtraining.domain.User;
import vn.group16.gymtraining.service.UploadService;
import vn.group16.gymtraining.service.UserService;
import vn.group16.gymtraining.util.error.IdInvalidException;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.PutMapping;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    final private UserService userService;
    final private PasswordEncoder passwordEncoder;
    final private UploadService uploadService;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, UploadService uploadService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.uploadService = uploadService;
    }

    @PostMapping("/users/create")
    public ResponseEntity<User> createUser(@Valid @RequestPart("user") User postmanUser,
            @RequestParam("imageFile") MultipartFile imageFile) throws IdInvalidException {
        String avatar = "";
        if (imageFile != null) {
            avatar = this.uploadService.handleSaveUploadFile(imageFile, "avatars");
        } else {
            throw new IdInvalidException("Chưa chọn ảnh");
        }
        String hashPassWord = this.passwordEncoder.encode(postmanUser.getPassword());
        postmanUser.setPassword(hashPassWord);
        postmanUser.setAvatar(avatar);
        User user = this.userService.handleCreateUser(postmanUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/users/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("imageFile") MultipartFile imageFile) {
        String avatar = "";
        avatar = this.uploadService.handleSaveUploadFile(imageFile, "avatars");
        System.out.println(avatar);
        return ResponseEntity.ok(avatar);
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") long id) throws IdInvalidException {
        if (id > 1500 || id <= 0) {
            throw new IdInvalidException("ID Không hợp lệ");
        } else if (this.userService.getUserById(id) == null) {
            throw new IdInvalidException("Không tìm thấy user");
        } else {
            this.userService.handleDeteteUser(id);
            return ResponseEntity.ok("user");
        }
    }

    @GetMapping("/users/getById/{user_id}")
    public ResponseEntity<User> getUserById(@PathVariable("user_id") long user_id) throws IdInvalidException {
        if (user_id > 1500) {
            throw new IdInvalidException("ID không hợp lệ");
        } else if (this.userService.getUserById(user_id) == null) {
            throw new IdInvalidException("Không tìm thấy user");
        } else {
            User user = this.userService.getUserById(user_id);
            return ResponseEntity.ok(user);
        }
    }

    @PutMapping("/users/update")
    public ResponseEntity<User> updateUser(@Valid @RequestBody User userUpdate) {
        return ResponseEntity.ok(this.userService.handleUpdateUser(userUpdate));
    }

    @GetMapping("/users/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(this.userService.getAllUsers());
    }

}
