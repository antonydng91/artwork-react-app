import { forwardRef } from "react";


const InputSearch=forwardRef(({title,onSearch},ref)=>{  //forwarding  the reference form parent to input

return(
         <>
         <label htmlFor="search_title">{title}</label><input ref={ref} id="search_title" onChange={onSearch} type="text"></input>
         </>
       
    )
})

export default InputSearch; 