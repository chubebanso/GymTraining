package vn.group16.gymtraining.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.group16.gymtraining.domain.Role;
import vn.group16.gymtraining.domain.User;
import vn.group16.gymtraining.dto.CreateUserDTO;
import vn.group16.gymtraining.repository.RoleRepository;
import vn.group16.gymtraining.repository.UserRepository;

@Service
public class UserService {
    final private UserRepository userRepository;
    final private RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User handleCreateUser(CreateUserDTO user) {
        Role role = this.roleRepository.findByName(user.getRoleName());
        if (role != null) {
            User currentUser = new User();
            currentUser.setAge(user.getAge());
            currentUser.setEmail(user.getEmail());
            currentUser.setName(user.getName());
            currentUser.setPassword(user.getPassword());
            currentUser.setGender(user.getGender());
            currentUser.setRole(role);
            currentUser.setPhone(user.getPhone());
            return this.userRepository.save(currentUser);
        }
        return null;
    }

    public void handleDeteteUser(long id) {
        this.userRepository.deleteById(id);
    }

    public User getUserById(long id) {
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        return null;
    }

    public User handleUpdateUser(User user) {
        Optional<User> userUpdate = this.userRepository.findById(user.getId());
        if (userUpdate.isPresent()) {
            User currentUser = userUpdate.get();
            currentUser.setEmail(user.getEmail());
            currentUser.setName(user.getName());
            currentUser.setPassword(user.getPassword());
            currentUser.setAge(user.getAge());
            currentUser.setGender(user.getGender());
            currentUser.setRole(user.getRole());
            currentUser.setPhone(user.getPhone());
            return this.userRepository.save(currentUser);
        }
        return null;
    }

    public User getUserByUserName(String email) {
        return this.userRepository.findByEmail(email);
    }

    public void updateToken(String refreshToken, String email) {
        User currentUser = this.userRepository.findByEmail(email);
        if (currentUser != null) {
            currentUser.setRefreshToken(refreshToken);
            this.userRepository.save(currentUser);
        }
    }

    public User getUserByRefreshTokenAndEmail(String email, String token) {
        return this.userRepository.findByEmailAndRefreshToken(email, token);
    }

    public List<User> getAllUsers() {
        List<User> users = this.userRepository.findAll();
        List<User> result = new ArrayList<>();
        for (User user : users) {
            User userl = new User(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getPhone(),
                    user.getAge(),
                    user.getGender(),
                    user.getImage(),
                    user.getRole()
                    );
            result.add(userl);
        }
        return result;
    }

    public User handleEditInforUser(User user) {
        Optional<User> userUpdate = this.userRepository.findById(user.getId());
        if (userUpdate.isPresent()) {
            User currentUser = userUpdate.get();
            currentUser.setEmail(user.getEmail());
            currentUser.setName(user.getName());
            currentUser.setAge(user.getAge());
            currentUser.setGender(user.getGender());
            currentUser.setPhone(user.getPhone());
            currentUser.setHeight(user.getHeight());
            currentUser.setWeight(user.getWeight());
            currentUser.setImage(user.getImage());
            return this.userRepository.save(currentUser);
        }
        return null;
    }
}