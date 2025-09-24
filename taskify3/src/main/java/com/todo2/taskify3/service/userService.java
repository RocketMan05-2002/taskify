package com.todo2.taskify3.service;


import com.todo2.taskify3.entities.User;
import com.todo2.taskify3.repository.myrepo;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class myservice {
    @Autowired
    myrepo repo;

    public User adduser(User user) {
        User newUser = new User(); // new user created
        // json se aaya user isme set
        newUser.setUserName(user.getUserName());
        newUser.setPassword(user.getPassword());
        try {
            repo.save(newUser);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
         //new user saved at database
        return newUser;
    }

    public List<User> getAllUsers(){
        return repo.findAll();
    }

    // get a user
    public User getUser(String userId){
        return repo.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }
}
