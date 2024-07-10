package com.bookreview.bookreview.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookreview.bookreview.Model.Reviews;
import com.bookreview.bookreview.Model.UserDatas;
import com.bookreview.bookreview.Service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "UserController")
@RestController
public class UserController 
{
    @Autowired
    UserService US;
    
    @GetMapping("/UserDatas/GetAll")
    public ResponseEntity<List<UserDatas>> getAll()
    {
        try{
            return new ResponseEntity<>(US.getAll(),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/UserDatas/GetById/{id}")
    public ResponseEntity<UserDatas> getById(@PathVariable int id)
    {
        try{
            return new ResponseEntity<>(US.getById(id),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/UserDatas/Email/{Email}")
    public ResponseEntity<Map<String, Boolean>> getEResponse(@PathVariable String Email) 
    {
        try {
            Map<String, Boolean> M = new HashMap<>();
            if (US.email(Email)) {
                M.put("exist", true);
            } else {
                M.put("exist", false);
            }
            return new ResponseEntity<>(M, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @GetMapping("/UserDatas/Name/{Name}")
    public ResponseEntity<Map<String,Boolean>> getNResponse(@PathVariable String Name)
    {
        try{
            Map<String,Boolean> M=new HashMap<String,Boolean>();
            if(US.uname(Name))
            M.put("exist", true);
            else
            M.put("exist", false);
            return new ResponseEntity<>(M,HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    

    @PostMapping("/UserDatas/InsertNew")
    public ResponseEntity<String> postnew(@RequestBody UserDatas U)
    {
        try{
            US.postdata(U);
            return new ResponseEntity<>("New User Created SuccessFully!",HttpStatus.CREATED);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/UserDatas/InsertAll")
    public ResponseEntity<String> postAll(@RequestBody List<UserDatas> U)
    {
        try{
            US.postalldata(U);
            return new ResponseEntity<>("New Users Created SuccessFully!",HttpStatus.CREATED);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/UserDatas/UpdateById/{id}")
    public ResponseEntity<String> update(@RequestBody UserDatas U,@PathVariable int id)
    {
        try{
            US.updatedata(U);
            return new ResponseEntity<>("UserDatas Updated SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/UserDatas/UpdateById/Review/{id}")
    public ResponseEntity<String> update(@RequestBody Reviews R,@PathVariable int id)
    {
        try{
            US.updateReview(id, R);
            return new ResponseEntity<>("UserDatas Updated SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    
    @PutMapping("/UserDatas/MsgToAll")
    public ResponseEntity<String> MsgToAll(@RequestBody String msg)
    {
        try{
            US.MsgToAll(msg);
            return new ResponseEntity<>("Msgs Updated SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    
    @PutMapping("/UserDatas/MsgById/{id}")
    public ResponseEntity<String> MsgById(@RequestBody String msg,@PathVariable int id)
    {
        try{
            US.MsgById(id, msg);
            return new ResponseEntity<>("Msg Updated SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    
    

    @DeleteMapping("/UserDatas/DeleteById/{id}")
    public ResponseEntity<String> DeleteByID(@PathVariable int id)
    {
        try{
            US.DeleteByID(id);
            return new ResponseEntity<>("UserDatas Deleted SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/UserDatas/DeleteReviewById/{id}/{bid}")
    public ResponseEntity<String> DeleteReviewByID(@PathVariable("id") int id,@PathVariable("bid") int bid)
    {
        try{
            US.deleteReviewById(id, bid);
            return new ResponseEntity<>("Review Deleted SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    

    @DeleteMapping("/UserDatas/DeleteAll")
    public ResponseEntity<String> DeleteAll()
    {
        try{
            US.deleteAll();
            return new ResponseEntity<>("UsersDatas Deleted SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    
}