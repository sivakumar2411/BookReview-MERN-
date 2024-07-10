package com.bookreview.bookreview.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.bookreview.bookreview.Model.Notifications;
import com.bookreview.bookreview.Model.Reviews;
import com.bookreview.bookreview.Model.UserDatas;
import com.bookreview.bookreview.Repository.UserRepo;

@Service
public class UserService 
{
    @Autowired
    UserRepo UR;

    @Autowired
    ReviewsService RS;

    public List<UserDatas> getAll()
    {
        return UR.findAll(Sort.by("id").ascending());
    }

    public UserDatas getById(int id)
    {
        return UR.findById(id);
    }

    public void postdata(UserDatas U)
    {
        UR.save(U);
    }

    public void postalldata(List<UserDatas> U)
    {
        UR.saveAll(U);
    }

    public void updatedata(UserDatas U)
    {
        UR.save(U);
    }

    public void DeleteByID(int id)
    {
        UR.deleteById(id);
    }

    public void deleteAll()
    {
        UR.deleteAll();
    }

    public boolean email(String a)
    {
        return UR.findByEmail(a);
    }

    public boolean uname(String a)
    {
        return UR.findByUname(a);
    }

    public void deleteReviewById(int id,int bid)
    {
        UserDatas U=UR.findById(id);
        List<Reviews> R=U.getReviews();
        for(Reviews R1:R)
        {
            if(R1.getAlterId()==bid)
            {
                R.remove(R1);
                break;
            }
        }
        U.setReviews(R);
        UR.save(U);
    }

    public void updateReview(int id,Reviews R)
    {
        UserDatas U=UR.findById(id);
        List<Reviews>R1=U.getReviews();
        for(Reviews R2:R1)
        if(R2.getAlterId()==R.getAlterId())
        {
            R.setId(R2.getId());
            R1.add(R1.indexOf(R2),R);
            R1.remove(R2);
        }
        U.setReviews(R1);
        UR.save(U);
    }

    public void MsgToAll(String msg)
    {
        List<UserDatas> U=UR.findAll();
        for(UserDatas U1:U)
        {
            int b=U1.getNotification().getLast().getId()+1;
            List<Notifications> N=U1.getNotification();
            N.add(new Notifications(b,msg,false));
            U1.setNotification(N);
        }
        UR.saveAll(U);
    }

    public void MsgById(int id,String msg)
    {
        UserDatas U=UR.findById(id);
        int a=U.getNotification().getLast().getId()+1;
        List<Notifications>N=U.getNotification();
        N.add(new Notifications(a, msg, false));
        U.setNotification(N);
        UR.save(U);
    }
    
}
