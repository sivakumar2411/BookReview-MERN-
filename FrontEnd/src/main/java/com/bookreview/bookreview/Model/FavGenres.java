package com.bookreview.bookreview.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "FavGenres")
public class FavGenres 
{
    private boolean all,philosophy,action,fiction,romance,history,nonFiction,selfHelpBook,biography,horror,politics,comics,fantasy;
    private int score;
}
