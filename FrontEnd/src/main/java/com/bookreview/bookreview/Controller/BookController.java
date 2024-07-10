package com.bookreview.bookreview.Controller;

import java.util.List;

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

import com.bookreview.bookreview.Model.BookDatas;
import com.bookreview.bookreview.Model.FavGenres;
import com.bookreview.bookreview.Model.Reviews;
import com.bookreview.bookreview.Service.BookService;

@RestController
public class BookController 
{
    @Autowired
    BookService BS;

    @GetMapping("/BookDatas/GetAll")
    public ResponseEntity<List<BookDatas>> getAll()
    {
        try{
            return new ResponseEntity<>(BS.getAll(),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/BookDatas/GetById/{id}")
    public ResponseEntity<BookDatas> getById(@PathVariable int id)
    {
        try{
            return new ResponseEntity<>(BS.getById(id),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/BookDatas/GetRecommdBooks")
    public ResponseEntity<List<BookDatas>> getRec(@RequestBody FavGenres F)
    {
        try{
            return new ResponseEntity<>(BS.getRecBooks(F),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/BookDatas/InsertNew")
    public ResponseEntity<String> postnew(@RequestBody BookDatas B)
    {
        try{
            BS.postdata(B);
            return new ResponseEntity<>("New Book Created SuccessFully!",HttpStatus.CREATED);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/BookDatas/InsertAll")
    public ResponseEntity<String> postAll(@RequestBody List<BookDatas> B)
    {
        try{
            BS.postAll(B);
            return new ResponseEntity<>("New Books Created SuccessFully!",HttpStatus.CREATED);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/BookDatas/UpdateById/{id}")
    public ResponseEntity<String> update(@RequestBody BookDatas B,@PathVariable int id)
    {
        try{
            BS.postdata(B);
            return new ResponseEntity<>("BookDatas Updated SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/BookDatas/UpdateById/Review/{id}")
    public ResponseEntity<String> update(@RequestBody Reviews B,@PathVariable int id)
    {
        try{
            BS.updateReview(id, B);
            return new ResponseEntity<>("BookDatas Updated SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    

    @DeleteMapping("/BookDatas/UpdateById/{id}/RemoveReview/{uid}")
    public ResponseEntity<String> updateandremovereview(@PathVariable("id") int id,@PathVariable("uid") int uid)
    {
        try{
            BS.deleteReviewById(uid, id);
            return new ResponseEntity<>("BookDatas Updated SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    

    @DeleteMapping("/BookDatas/DeleteById/{id}")
    public ResponseEntity<String> DeleteByID(@PathVariable int id)
    {
        try{
            BS.deleteById(id);
            return new ResponseEntity<>("BookDatas Deleted SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/BookDatas/DeleteAll")
    public ResponseEntity<String> DeleteAll()
    {
        try{
            BS.deleteAll();
            return new ResponseEntity<>("BooksDatas Deleted SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
}
