




    const fetchData=async function(url){
        let response = await fetch(url);
        let finalRes= await response.json();
        return finalRes;

    }
    export  {fetchData}

    const  debounce= (func, timeout = 300)=>{ // used to ehance the perfomance for Search using title ( Debouncing)
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }
    
      export  {debounce}
    

   