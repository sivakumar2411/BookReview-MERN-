package com.bookreview.bookreview.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Document(collection = "ShowCaseDatas")
public class ShowCaseDatas {

    @Id
    private int id;
    private int bookId;

}
