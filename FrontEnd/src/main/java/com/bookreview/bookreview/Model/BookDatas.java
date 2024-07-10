package com.bookreview.bookreview.Model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "BookDatas")
public class BookDatas 
{

    @Id
    private int id;

    private String name,author,description;

    private boolean r_Rated;

    private FavGenres genre;
    private Images bookCover;

    private List<Reviews> reviews;

}
