package com.bookreview.bookreview.Model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document (collection = "UserDatas")
public class UserDatas 
{
    @Id
    private int id;

    private String uname,name,bio,gender,region,email,password;
    private boolean admin;

    private Images profilePic;
    private FavGenres intrestedGenres;

    private List<Reviews> reviews;
    private List<Notifications> notification;

}
