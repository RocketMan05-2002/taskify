package com.todo2.taskify3.controller;

import com.todo2.taskify3.entities.User;
import com.todo2.taskify3.service.myservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class mycontroller {
    @Autowired
    myservice service;

    @PostMapping("/addUser")
    public String addUser(@RequestBody User u){
        return service.adduser(u);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }
}
