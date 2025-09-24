package com.todo2.taskify3.repository;


import com.todo2.taskify3.entities.Clip;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface clipRepo extends MongoRepository<Clip, String > {
}
