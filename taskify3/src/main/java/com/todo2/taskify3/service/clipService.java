package com.todo2.taskify3.service;

import java.util.List;
import java.util.Optional;

import com.todo2.taskify3.DTO.Status;
import com.todo2.taskify3.entities.ClipStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo2.taskify3.entities.Clip;
import com.todo2.taskify3.entities.User;
import com.todo2.taskify3.repository.clipRepo;

@Service
public class clipService {
    @Autowired
    clipRepo clipRepo; // kyuki this is clipservice, isiliye khudka repo

    @Autowired
    userService userService; // here, we have to call the service. functions bhi use kar sakenge


    // add a clip-todo
    public Clip addClip(Clip c) {
        // save clip independently
        Clip savedClip = clipRepo.save(c);

        // also attach to user
        User user = userService.getUser(c.getUserId());
        user.getClips().add(savedClip);
        userService.saveUser(user);

        return savedClip;
    }

    // 📖 Read all clips for a given user
    public List<Clip> getAllClipsForUser(String userId) {
        return userService.getUser(userId).getClips();
    }

    // 📖 Read single clip
    public Clip getClipById(String clipId) {
        return clipRepo.findById(clipId)
                .orElseThrow(() -> new RuntimeException("Clip not found with id: " + clipId));
    }

    // ✏️ Update
    public void updateClip(String clipId, ClipStatus status) {
        Optional<Clip> clipOptional = clipRepo.findById(clipId);

        if (clipOptional.isPresent()) {
            Clip c = clipOptional.get();
            c.setStatus(status);  // update status
            clipRepo.save(c); // persist changes
        } else {
            throw new RuntimeException("Clip not found with id: " + clipId);
        }
    }

    // 🗑️ Delete
    public void deleteClip(String clipId) {
        Clip clip = clipRepo.findById(clipId)
                .orElseThrow(() -> new RuntimeException("Clip not found with id: " + clipId));

        // remove from Clip collection
        clipRepo.deleteById(clipId);

        // also remove from User.clips
        User user = userService.getUser(clip.getUserId());
        user.getClips().removeIf(c -> c.getId().equals(clipId));
        userService.saveUser(user);
    }
}
