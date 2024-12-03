package vn.group16.gymtraining.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import vn.group16.gymtraining.domain.User;
import vn.group16.gymtraining.repository.UserRepository;

@Service
public class UserService {
    final private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User handleCreateUser(User user) {
        return this.userRepository.save(user);
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
}
