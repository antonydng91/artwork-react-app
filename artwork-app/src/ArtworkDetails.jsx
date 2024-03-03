import { useState,useEffect } from 'react';
import TableDisplay from'./components/Table-data';
import { baseUrl } from './constants/AppConstants';
import {fetchData} from './api/Apis';


export default function ArtworkDetails({backToDetailsPage,pageData}) {
  const [artWorksDetails, SetartWorksDetails] = useState(null);

  useEffect(()=>{
    fetchAndSetData(`${baseUrl}/${pageData.id}`); // getting and Setting the Artwork Details
  },[])


  async function fetchAndSetData (url){
    const finalRes= await fetchData(url); //fetch the data
    SetartWorksDetails([finalRes.data]); // set the details data
  }

const goBack=()=>{
    backToDetailsPage({...pageData,isDetailsPage:false}); // move back to the Artwork main page

}
 

  return (
    <>
    <div>Art Work Details</div>

    <TableDisplay headerData={["Title","Artist","Date","Reference Number","Thumbnail","Dimensions"]} >
       {artWorksDetails && artWorksDetails.map((el) => (
            <tr key={el.id}>
              <td  >{el.title}</td>
              <td  >{el.artist_display}</td>
              <td >{el.date_display}</td>
              <td  >{el.main_reference_number}</td>
              <td  ><img height='40' width='40' alt={el.thumbnail?.alt_text} src={el.thumbnail?.lqip}/></td>
              <td  >{el.dimensions}</td>   
            </tr>
          ))}
    </TableDisplay>
    <button onClick={goBack}>Go Back</button>
   </>
  )
}

