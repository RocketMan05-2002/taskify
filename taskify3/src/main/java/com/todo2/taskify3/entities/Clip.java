package com.todo2.taskify3.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection="clips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Clip {
    @Id
    private String id;
    private String heading;
    private String description;
    private ClipStatus status;
    private String userId;
}