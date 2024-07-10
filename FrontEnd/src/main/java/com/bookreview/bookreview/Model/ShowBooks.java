package com.bookreview.bookreview.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShowBooks 
{
    private int id;
    private String name,author,img;
}
