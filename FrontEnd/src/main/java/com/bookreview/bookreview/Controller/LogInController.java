// package com.bookreview.bookreview.Controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.bookreview.bookreview.Model.LogInData;
// import com.bookreview.bookreview.Service.LogInService;

// import io.swagger.v3.oas.annotations.parameters.RequestBody;

// @RestController
// public class LogInController 
// {
//     @Autowired
//     LogInService LS;

//     @PostMapping("/LogInData/InsertNew")
//     public ResponseEntity<String> post(@RequestBody LogInData L)
//     {
//         try{
//             LS.postdata(L);
//             return new ResponseEntity<>("New LogData Created SuccessFully",HttpStatus.CREATED);
//         }
//         catch(Exception e)
//         {
//             return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @PostMapping("/LogInData/InsertAll")
//     public ResponseEntity<String> postAll(@RequestBody List<LogInData> L)
//     {
//         try{
//             LS.postall(L);
//             return new ResponseEntity<>("New LogDatas Created SuccessFully",HttpStatus.CREATED);
//         }
//         catch(Exception e)
//         {
//             return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @PostMapping("/LogInData/UpdataeById/{id}")
//     public ResponseEntity<String> update(@RequestBody LogInData L,@PathVariable int id)
//     {
//         try{
//             LS.postdata(L);
//             return new ResponseEntity<>("LogData Updated SuccessFully",HttpStatus.OK);
//         }
//         catch(Exception e)
//         {
//             return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
    
//     @GetMapping("/LogInData/GetAll")
//     public ResponseEntity<List<LogInData>> getAll()
//     {
//         try{
//             return new ResponseEntity<>(LS.getAll(),HttpStatus.OK);
//         }
//         catch(Exception e)
//         {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }

//     @GetMapping("/LogInData/GetById/{id}")
//     public ResponseEntity<LogInData> getById(@PathVariable int id)
//     {
//         try{
//             return new ResponseEntity<>(LS.getById(id),HttpStatus.OK);
//         }
//         catch(Exception e)
//         {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }
    

//     @DeleteMapping("/LogInData/DeleteAll")
//     public ResponseEntity<String> deleteAll()
//     {
//         try{
//             LS.deleteAll();
//             return new ResponseEntity<>("LogDatas Deleted SuccessFully!",HttpStatus.OK);
//         }
//         catch(Exception e)
//         {
//             return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
//         }
//     }

//     @DeleteMapping("/LogInData/DeleteById/{id}")
//     public ResponseEntity<String> deleteById(@PathVariable int id)
//     {
//         try{
//             LS.deleteById(id);
//             return new ResponseEntity<>("LogData Deleted SuccessFully!",HttpStatus.OK);
//         }
//         catch(Exception e)
//         {
//             return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
//         }
//     }

//     @GetMapping("/LogInData/GetByUNorEmail")
//     public ResponseEntity<LogInData> getByUNEM(@RequestBody String A)
//     {
//         try{
//             return new ResponseEntity<>(LS.getByUserNameorEmail(A),HttpStatus.OK);
//         }
//         catch(Exception e)
//         {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }
    

// }
