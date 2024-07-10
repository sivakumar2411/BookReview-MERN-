import React from 'react'
import ReviewwithDt from './ReviewwithDt';
import RatingStar from './RatingStar'
import '../assets/Css Files/BookDDD.css'

const BookDDD = ({data}) => {
  return (
    <div style={{minHeight:"40"}}>
    {(data?.length!==0)?
    <>{data?.map((book)=>
    (<div key={book.id}>
        <div id='bookprofilepic' ><img src={book.bookCover.url} alt={book.name} style={{width:'100%',height:'100%'}}></img></div>
        <div id='reviewnameratingcontainer'><p id='reviewbookname'>{book.name}</p><div id='reviewoverallrating'><RatingStar reviews={book.reviews} /></div></div>
        <div id='reviewdetailcontainer'>
          <ReviewwithDt Book={book} Reviewdata={book.reviews} />
        <hr style={{borderStyle:"dashed",width:"150px",marginTop:"40px"}} />
        </div>
        <br /><br />
    </div>
  ))}</>:<div style={{margin:"auto",textAlign:"center",fontSize:"40px",color:"rgb(31,31,31)",textShadow:"1px 2px 1px black",marginTop:"100px"}}>No Books Found!</div>}
  </div>
  )
}

export default BookDDD


