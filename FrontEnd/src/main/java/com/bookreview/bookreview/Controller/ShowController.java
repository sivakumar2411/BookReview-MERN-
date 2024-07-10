package com.bookreview.bookreview.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookreview.bookreview.Model.ShowBooks;
import com.bookreview.bookreview.Service.ShowService;

@RestController
public class ShowController 
{
    @Autowired
    ShowService SS;

    @GetMapping("/BookShowCase/GetAll")
    public ResponseEntity<List<ShowBooks>> getAll()
    {
        try{
            return new ResponseEntity<>(SS.getAll(),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/BookShowCase/InsertNew/{id}")
    public ResponseEntity<String> post(@PathVariable int id)
    {
        try{
            SS.postNew(id);
            return new ResponseEntity<>("Posted SuccessFully!",HttpStatus.CREATED);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/BookShowCase/Remove/{id}")
    public ResponseEntity<String> remove(@PathVariable int id)
    {
        try{
            SS.deleteById(id);
            return new ResponseEntity<>("Removede SuccessFully!",HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
}
