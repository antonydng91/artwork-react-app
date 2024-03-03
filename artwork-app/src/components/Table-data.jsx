
import Paginator from './Pagination';
import uuid from 'react-uuid';

export default  function TableDisplay(props){
  return(<><table >
        <thead >
          <tr  >
          {props.headerData && props.headerData.map((el) => (
             <th key={uuid()}>{el}</th>
           )
          )}
        </tr>
       </thead>
        <tbody>
           {props.children}{/*user can pass the customized data as he wishes*/} 
        </tbody>
      </table>
      {props.pagination &&  <Paginator current={props.pagination.currentPage} goToPage={props.pagination.gotToPage}></Paginator>} {/*Pagination Component*/} 
       </>
      
      )

}