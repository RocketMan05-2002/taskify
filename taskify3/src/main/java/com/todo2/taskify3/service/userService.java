package com.todo2.taskify3.service;

import com.todo2.taskify3.entities.User;
import com.todo2.taskify3.repository.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class userService {

    @Autowired
    private userRepo repo;

    // ➕ Create
    public User addUser(User user) {
        User newUser = new User();
        newUser.setUserName(user.getUserName());
        newUser.setPassword(user.getPassword());
        // initialize empty clip list
        newUser.setClips(user.getClips() != null ? user.getClips() : List.of());

        try {
            return repo.save(newUser);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save user", e);
        }
    }

    // 📖 Get all users
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // 📖 Get single user
    public User getUser(String userId) {
        return repo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    // ✏️ Update existing user
    public User saveUser(User user) {
        try {
            return repo.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user", e);
        }
    }

    // 🗑️ Delete user
    public void deleteUser(String userId) {
        if (repo.existsById(userId)) {
            repo.deleteById(userId);
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }
}