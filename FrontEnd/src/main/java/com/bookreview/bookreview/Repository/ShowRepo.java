package com.bookreview.bookreview.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bookreview.bookreview.Model.ShowCaseDatas;


@Repository
public interface ShowRepo extends MongoRepository<ShowCaseDatas,Integer> 
{
    ShowCaseDatas findById(int id);

}
