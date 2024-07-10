package com.bookreview.bookreview.Service;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookreview.bookreview.Model.BookDatas;
import com.bookreview.bookreview.Model.FavGenres;
import com.bookreview.bookreview.Model.Reviews;
import com.bookreview.bookreview.Repository.BookRepo;

@Service
public class BookService 
{
    @Autowired
    BookRepo BR;

    public List<BookDatas> getAll()
    {
        return BR.findAll();
    }

    public BookDatas getById(int id)
    {
        return BR.findById(id);
    }

    public void postdata(BookDatas B)
    {
        BR.save(B);
    }

    public void postAll(List<BookDatas> B)
    {
        BR.saveAll(B);
    }

    public void deleteById(int id)
    {
        BR.deleteById(id);
    }

    public void deleteAll()
    {
        BR.deleteAll();
    }

    public void deleteReviewById(int uid,int bid)
    {
        BookDatas B=BR.findById(bid);
        List<Reviews> R=B.getReviews();
        for(Reviews R1:R)
        if(R1.getAlterId()==uid)
        {
            R.remove(R1);
            break;
        }
        B.setReviews(R);
        BR.save(B);
    }
    
    public void deleteReviewByIdandBook(int id,int Bid)
    {
        BookDatas B=BR.findById(Bid);
        List<Reviews> R=B.getReviews();
        for(Reviews R1:R)
        if(R1.getId()==id)
        {
            R.remove(R1);
            break;
        }
        B.setReviews(R);
        BR.save(B);
    }

    public void updateReview(int id,Reviews R)
    {
        BookDatas B=BR.findById(id);
        List<Reviews>R1=B.getReviews();
        for(Reviews R2:R1)
        if(R2.getAlterId()==R.getAlterId())
        {
            R.setId(R2.getId());
            R1.add(R1.indexOf(R2),R);
            R1.remove(R2);
        }
        B.setReviews(R1);
        BR.save(B);
    }

    public List<BookDatas> getRecBooks(FavGenres F)
    {
        List<BookDatas> BD=BR.findAll();
        for(BookDatas B:BD)
        {
            FavGenres F1=B.getGenre();
            F1.setScore(0);
            B.setGenre(F1);
        }
        if(F.isBiography())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isBiography())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isAction())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isAction())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isComics())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isComics())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isFantasy())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isFantasy())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isFiction())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isFiction())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isHistory())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isHistory())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isHorror())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isHorror())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isNonFiction())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isNonFiction())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isPhilosophy())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isPhilosophy())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isPolitics())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isPolitics())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isRomance())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isRomance())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        if(F.isSelfHelpBook())
        for(BookDatas B:BD)
        {
            if(B.getGenre().isSelfHelpBook())
            {
                FavGenres F1=B.getGenre();
                F1.setScore(F1.getScore()+5);
                B.setGenre(F1);
            }
        }
        Comparator <BookDatas> C=Comparator.comparing(book->book.getGenre().getScore());
        BD.sort(C);
        return BD.reversed();
    }
}
