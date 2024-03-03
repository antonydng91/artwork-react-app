import { useState,useEffect } from "react";
export default function Paginator({current,goToPage}){

const [currentPage,SetCurrentPage]=useState(current);

  useEffect(()=>{
      goToPage(currentPage);
  },[currentPage])
      
  const goToNext=()=>{
    SetCurrentPage((prevPage)=>{
      return prevPage+1;
    })
  }

  const goToPrevios=()=>{
    SetCurrentPage((prevPage)=>{
       return prevPage-1;
    }) 
  }

 return( <div  className="paginator"><button onClick={goToPrevios} disabled={currentPage==1?true:false}>Previous</button><div><label htmlFor='pagenumber'>Page:</label><span id="pagenumber">{currentPage.toString()}</span></div><button onClick={goToNext}>Next</button> </div>)

   
}