package com.todo2.taskify3.repository;


import com.todo2.taskify3.entities.Clip;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

public interface clipRepo extends MongoRepository<Clip, String > {
    @Transactional
    void deleteByUserId(String userId);
}
