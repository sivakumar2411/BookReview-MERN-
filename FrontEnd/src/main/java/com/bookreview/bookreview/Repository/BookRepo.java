package com.bookreview.bookreview.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bookreview.bookreview.Model.BookDatas;


@Repository
public interface BookRepo extends MongoRepository<BookDatas,Integer> 
{

    BookDatas findById(int id);
    
}
