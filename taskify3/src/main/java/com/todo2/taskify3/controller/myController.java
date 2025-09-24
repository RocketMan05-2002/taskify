package com.todo2.taskify3.controller;

import com.todo2.taskify3.entities.ClipStatus;
import com.todo2.taskify3.entities.User;
import com.todo2.taskify3.service.clipService;
import com.todo2.taskify3.service.myService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/todo")
public class myController {
    @Autowired
    myService service;

    @Autowired
    clipService clipService;

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User u) {
        User savedUser = service.adduser(u);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }

    @DeleteMapping("/delete/clip/{id}")
    public ResponseEntity<String> deleteClip(@PathVariable("id") String id) {
        clipService.deleteClip(id);
        return ResponseEntity.ok("Clip deleted successfully with id: " + id);
    }


    @PutMapping("/update/clip/{id}")
    public ResponseEntity<String> updateClipStatus(
            @PathVariable("id") String id,
            @RequestParam("status") ClipStatus status) {

        clipService.updateClip(id, status);
        return ResponseEntity.ok("Clip status updated successfully to: " + status);
    }
}
