package com.bookreview.bookreview.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.bookreview.bookreview.Model.Reviews;
import com.bookreview.bookreview.Repository.ReviewRepo;

@Service
public class ReviewsService 
{
    @Autowired
    ReviewRepo RR;

    @Autowired
    MongoTemplate MT;

    public List<Reviews> getByUserId(int id)
    {
        Query que=new Query();
        que.addCriteria(Criteria.where("userId").is(id));
        return MT.find(que, Reviews.class);
    }
}
