package com.bookreview.bookreview.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bookreview.bookreview.Model.Reviews;

@Repository
public interface ReviewRepo extends MongoRepository<Reviews,Integer> 
{

}
