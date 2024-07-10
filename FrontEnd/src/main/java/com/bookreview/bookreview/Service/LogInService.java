// package com.bookreview.bookreview.Service;

// import java.util.List;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.bookreview.bookreview.Model.LogInData;
// import com.bookreview.bookreview.Repository.LogInRepo;

// @Service
// public class LogInService 
// {
//     @Autowired
//     LogInRepo LR;


//     public void postdata(LogInData L)
//     {
//         LR.save(L);
//     }

//     public void postall(List<LogInData> L)
//     {
//         LR.saveAll(L);
//     }

//     public LogInData getByUserNameorEmail(String A)
//     {
//         if(LR.findByEmail(A)!=null)
//         return LR.findByEmail(A);
//         else if(LR.findByName(A)!=null)
//         return LR.findByName(A);
//         return null;
//     }
    
//     public List<LogInData> getAll()
//     {
//         return LR.findAll();
//     }

//     public LogInData getById(int id)
//     {
//         return LR.findById(id);
//     }

//     public void deleteById(int id)
//     {
//         LR.deleteById(id);
//     }

//     public void deleteAll()
//     {
//         LR.deleteAll();
//     }

// }
