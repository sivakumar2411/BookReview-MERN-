package com.bookreview.bookreview.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Notifications")
public class Notifications 
{
    @Id
    private int id;

    private String msg;
    private boolean seen;

}
