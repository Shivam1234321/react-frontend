import { useState } from "react"
import { getAuthToken, getAuthUser } from "../auth/AuthData";
import { useNavigate } from "react-router-dom";

export const Product= ()=>{
    const [name, setName]= useState("");
    const [price, setPrice]= useState("");
    const [category, setCategory]= useState("");
    const [company, setCompany]= useState("");
    const [error, setError]= useState();
    const navigate= useNavigate();

    const handleSubmit= async () =>{

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        let userId= getAuthUser()._id;
        let result= await fetch(`${process.env.REACT_APP_API_URL}add-product'`, {
            method: 'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${getAuthToken()}`
            }
        });
        result= await result.json();
        navigate('/');
    }

    return(
        <div className="center">
            <h1>Product</h1>
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