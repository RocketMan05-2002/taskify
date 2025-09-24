package com.todo2.taskify3.controller;

import com.todo2.taskify3.entities.User;
import com.todo2.taskify3.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/todo")
public class userController {
    @Autowired
    userService service;

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User u) {
        User savedUser = service.adduser(u);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }
}
