package com.bookreview.bookreview.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookreview.bookreview.Model.BookDatas;
import com.bookreview.bookreview.Model.ShowBooks;
import com.bookreview.bookreview.Model.ShowCaseDatas;
import com.bookreview.bookreview.Repository.ShowRepo;

@Service
public class ShowService 
{
    @Autowired
    ShowRepo SR;

    @Autowired
    BookService BS;

    public void postNew(int id)
    {
        List<ShowCaseDatas> S=SR.findAll();
        for(ShowCaseDatas S1:S)
        if(S1.getBookId()==id)
        return;
        if(S.size()==5)
        {
            S.removeFirst();
            S.addFirst(new ShowCaseDatas(1, id));
        }
        else
        S.add(new ShowCaseDatas(S.size()+1, id));
        SR.saveAll(S);
    }

    public List<ShowBooks> getAll()
    {
        List<ShowCaseDatas> S=SR.findAll();
        List<ShowBooks> SB=new ArrayList<>();
        for(ShowCaseDatas S1:S)
        {
            BookDatas B=BS.getById(S1.getBookId());
            SB.add(new ShowBooks(S1.getId(), B.getName(), B.getAuthor(), B.getBookCover().getUrl()));
        }
        return SB;
    }

    public void deleteById(int id)
    {
        int a=0;
        List<ShowCaseDatas> S=SR.findAll();
        for(ShowCaseDatas S1:S)
        if(S1.getBookId()==id)
        {
            S.remove(S1);
            a=1;
            break;
        }
        if(a==0)
        return;
        for(ShowCaseDatas S1:S)
        {
            S1.setId(a);
            a+=1;
        }
        SR.deleteAll();
        SR.saveAll(S);
    }
}
