package com.todo2.taskify3.service;


import com.todo2.taskify3.entities.User;
import com.todo2.taskify3.repository.myrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class myservice {
    @Autowired
    myrepo repo;

    public String adduser(User u) {
        User newUser = new User(); // new user created
        // json se aaya user isme set
        newUser.setUserName(u.getUserName());
        newUser.setPassword(u.getPassword());
        repo.save(newUser); //new user saved at database
        return "User Added";
    }

    public List<User> getAllUsers(){
        return repo.findAll();
    }
}
