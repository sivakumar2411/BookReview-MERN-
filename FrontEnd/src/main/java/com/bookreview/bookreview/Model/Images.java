package com.bookreview.bookreview.Model;


import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "Images")
public class Images 
{
    private String url;

}
