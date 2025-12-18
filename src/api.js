 export async function fetchData(url) {
    try{
         const data= await fetch(url)
        if(!data.ok){
            throw new error("city not found");
        }
    
        return data.json();
    }catch(error){
        return {"error": error.massage};
    }
   
}
