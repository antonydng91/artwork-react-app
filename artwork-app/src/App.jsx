import {useState } from 'react';
import './App.css';
import Artwork from './ArtworkMain';
import ArtworkDetails from './ArtworkDetails';




function App() {

const [pageDatas,setPageData]=useState({isDetailsPage:false,currentPage:1,id:null});

 const setDetailsData=(obj)=>{
  setPageData((prev)=>{
       return {...prev,isDetailsPage:obj.isDetailsPage,currentPage:obj.currentPage,id:obj.id} // Lifting the state up to move and pass data between ArtWork page and Artwork Details page
    });
  }

  return(<> {!pageDatas.isDetailsPage && <Artwork moveToDetailPage={setDetailsData} pageData={pageDatas}></Artwork>}
  {pageDatas.isDetailsPage && <ArtworkDetails backToDetailsPage={setDetailsData} pageData={pageDatas}></ArtworkDetails>}</>)

};

/*All the resusable components are added inisde the compoents folder 

All the apis which can be resused are added in api folder

The baseuRl is added inside a constant file.


*/

 

export default App
