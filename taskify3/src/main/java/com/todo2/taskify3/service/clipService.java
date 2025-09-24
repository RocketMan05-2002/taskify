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
    clipRepo clip; // kyuki this is clipservice, isiliye khudka repo

    @Autowired
    myService msvc; // here, we have to call the service. functions bhi use kar sakenge


    // add a clip-todo
    public Clip addClip(Clip c){
        Clip newClip = new Clip();
        newClip.setHeading(c.getHeading());
        newClip.setDescription(c.getDescription());
        newClip.setStatus(c.getStatus());
        try {
            clip.save(newClip);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
         //new user saved at database
        return newClip;
    }

    // get all clips
    public List<Clip> getAllClipsForAUser(String userId){
        User user = msvc.getUser(userId);
        return user.getClips();
    }

    //delete clip
    public void deleteClip(String clipId){
        if (clip.existsById(clipId)) {
            clip.deleteById(clipId);
        } else {
            throw new RuntimeException("Clip not found with id: " + clipId);
        }
    }

    public void updateClip(String clipId, ClipStatus status) {
        Optional<Clip> clipOptional = clip.findById(clipId);

        if (clipOptional.isPresent()) {
            Clip c = clipOptional.get();
            c.setStatus(status);  // update status
            clip.save(c); // persist changes
        } else {
            throw new RuntimeException("Clip not found with id: " + clipId);
        }
    }
}
