package com.bookreview.bookreview.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bookreview.bookreview.Model.UserDatas;



@Repository
public interface UserRepo extends MongoRepository<UserDatas,Integer> 
{
    UserDatas findById(int id);

    boolean findByUname(String uname);

    boolean findByEmail(String email);
}
