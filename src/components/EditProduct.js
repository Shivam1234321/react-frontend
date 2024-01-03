import { useEffect, useState } from "react"
import { getAuthToken, getAuthUser } from "../auth/AuthData";
import { useParams } from "react-router-dom";

export const EditProduct= ()=>{
    const [name, setName]= useState("");
    const [price, setPrice]= useState("");
    const [category, setCategory]= useState("");
    const [company, setCompany]= useState("");
    const [error, setError]= useState();
    const params= useParams();

    useEffect(()=>{
        getSingleProduct();
    },[]);

    const getSingleProduct= async () =>{
        let result= await fetch(`http://localhost:3030/product/${params.id}`,{
            headers:{
                "Authorization": `bearer ${getAuthToken()}`
            }
        });
        result= await result.json();
        if(result._id){
            setName(result.name);
            setCategory(result.category);
            setCompany(result.company);
            setPrice(result.price);
        }
    }

    const handleSubmit= async () =>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        let userId= getAuthUser()._id;
        let result= await fetch(`${process.env.REACT_APP_API_URL}product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({name, price, category, company, userId}),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${getAuthToken()}`
            }
        });
        await result.json();
        getSingleProduct();
    }

    return(
        <div className="center">
            <h1>Edit Product</h1>
            <input type="text" placeholder="Enter Product Name" className="inputBox" value={name} onChange={(e) => setName(e.target.value)}/>
            {error && !name && <span className="invalid">Please enter valid name</span>}
            <input type="text" placeholder="Enter Product Price" className="inputBox" value={price} onChange={(e) => setPrice(e.target.value)}/>
            {error && !price && <span className="invalid">Please enter valid price</span>}
            <input type="text" placeholder="Enter Product Category" className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)}/>
            {error && !category && <span className="invalid">Please enter valid category</span>}
            <input type="text" placeholder="Enter Product Company" className="inputBox" value={company} onChange={(e) => setCompany(e.target.value)}/>
            {error && !company && <span className="invalid">Please enter valid company</span>}
            <button onClick={handleSubmit} className="submitButton" type="button">Submit</button>
        </div>
    )
}