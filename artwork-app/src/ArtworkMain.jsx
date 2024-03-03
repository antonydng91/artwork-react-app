import { useState,useEffect,useRef } from 'react';
import InputSearch from './components/Input-search';
import FilterBy from './components/Filter-by';
import TableDisplay from'./components/Table-data';
import { baseUrl } from './constants/AppConstants';
import {fetchData,debounce} from './api/Apis';


import './App.css'

export default function Artwork({moveToDetailPage,pageData}) {

  const [artWorks, setartWorks] = useState(null);
  const [currentPage, setCurrentPage] = useState(pageData.currentPage);
  const [categoryMap, setCategoryMap] = useState(new Map()); //created as map to remove duplicated category code and category title
  const inputRef=useRef(null);
  const ref = useRef(true);

  
  useEffect(()=>{
    const firstRender = ref.current;
   if (firstRender) {
      ref.current = false;
    } else {
      getPlainArtData();
    }
    
  },[currentPage])//calls the api end point while paginating

  function getPlainArtData(){
    let Url=`${baseUrl}?page=${currentPage}&limit=10`;
    if(inputRef.current.value){ // if there is a value in text field, data has to be fetch based on the same while paginating
        Url=`${baseUrl}/search?query[match][title][query]=${inputRef.current.value}&page=${currentPage}&limit=10`;   
    }
    fetchAndSetData(Url);
  }

  async function fetchAndSetData (url,categoryChange){
    const res= await fetchData(url);
    if(!categoryChange){
      generateCategory([...res.data]);
    }
     setartWorks([...res.data]);
   
 }


  const generateCategory=(data)=>{//creates dynamic Category based on  the page and records
    let dataGoryObject=new Map([["",""]]);
    for(let items of data){
      if(items.category_ids && items.category_ids.length){
        items.category_ids.forEach((item,index)=>{
          dataGoryObject.set(item,items.category_titles[index]); 
       })
      }
    }
    setCategoryMap(dataGoryObject)
 }

  const goToSpecificPage=(pageVal)=>{
      setCurrentPage(pageVal) 
  }


  const searchByCategory=(e)=>{ //filter based on category
    let Url=`${baseUrl}?page=${currentPage}&limit=10`
    if(e.target.value){
      Url=`${baseUrl}/search?query[term][category_ids]=[${e.target.value}]&page=${currentPage}&limit=10`;
     }
     fetchAndSetData(Url,true); // this seems not working as query always return empty
  }


  const searchByTitle=(e)=>{
    if(e.target.value){
      fetchAndSetData(`${baseUrl}/search?query[match][title][query]=${e.target.value}&page=${currentPage}&limit=10`);   
    }else{
        getPlainArtData()
    }
  }

  function getToDetailsPage(id){ // move to details page on click of title or thumbnail
     moveToDetailPage({isDetailsPage:true,currentPage:currentPage,id:id});
  }

  return (
    <>
 <div className='search-filter'> <InputSearch title="Search By Title" ref={inputRef} onSearch={debounce(searchByTitle) } />
    <FilterBy title="Filter By" filterObject={categoryMap} onChange={searchByCategory} /></div>
   
    <TableDisplay headerData={["Title","Thumbnail"]} pagination={{currentPage:currentPage,gotToPage:goToSpecificPage}}>
       {artWorks && artWorks.map((el) => (
            <tr key={el.id}>
              <td className="art-details-title" onClick={()=>getToDetailsPage(el.id)}><a>{el.title}</a></td>
               <td  className="art-details-title"  onClick={()=>getToDetailsPage(el.id)}><a><img height='40' width='40' alt={el.thumbnail?.alt_text} src={el.thumbnail?.lqip}/></a></td>
              </tr>
          ))}
    </TableDisplay>
   </>
  )
}

