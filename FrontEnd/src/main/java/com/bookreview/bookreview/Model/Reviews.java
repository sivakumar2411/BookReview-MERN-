package com.bookreview.bookreview.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "Reviews")
public class Reviews 
{
    @Id
    private int id;

    private double rating;

    private String review;

    private int alterId;

}
