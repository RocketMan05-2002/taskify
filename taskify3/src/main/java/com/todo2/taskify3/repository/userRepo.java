package com.todo2.taskify3.repository;


import com.todo2.taskify3.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface myrepo extends MongoRepository<User, String > {
}
