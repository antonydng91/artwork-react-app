

export default function FilterBy({title,onChange,filterObject}){

    return(
             <>
            <label htmlFor="filter_by">{title??"Filter"}</label>
                  <select id="filter_by" onChange={onChange} >
                    {Array.from( filterObject ).map(([key,value])=>{  //used to iterate the map
                      return <option key ={key} value={key}>{value}</option>
                    })}
                  </select>
             
             </>
           
        )
    }