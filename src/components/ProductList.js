import { useEffect, useState } from "react"
import {Link} from 'react-router-dom';
import { getAuthToken } from "../auth/AuthData";

export const ProductList = () => {
    const [products, setProduct] = useState();
    useEffect(() => {
        getProduct();
    }, []);
    const getProduct = async () => {
        let result = await fetch(`${process.env.REACT_APP_API_URL}products`,{
            headers:{
                "Authorization": `bearer ${getAuthToken()}`
            }
        });
        result = await result.json();
        setProduct(result);
    }

    const deleteProduct= async (id)=>{
        let result= await fetch(`${process.env.REACT_APP_API_URL}product/${id}`,{
            method: "Delete",
            headers:{
                "Authorization": `bearer ${getAuthToken()}`
            }
        });
        await result.json();
        getProduct();
    }

    const searchProduct= async (event) =>{
        let search= event.target.value;
        if(search.length){
            let result= await fetch(`${process.env.REACT_APP_API_URL}search/${search}`,{
                headers:{
                    "Authorization": `bearer ${getAuthToken()}`
                }
            });
            result= await result.json();
            setProduct(result);
        }else{
            getProduct();
        }
        
    }

    return (
        <div className="center">
            <h1>Product Page</h1>
            <input type="text" placeholder="Serach Product" onChange={searchProduct} className="inputBox"/>
            <table className="table" cellSpacing={0}>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Category</td>
                        <td>Company</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {   
                        products && products.length > 0 ?
                        products?.map((item, index) =>
                            <tr key={item._id}>
                                <td>{index + 1}</td> 
                                <td>{item?.name}</td>
                                <td>{item?.price}</td>
                                <td>{item?.category}</td>
                                <td>
                                    <button type="button" onClick={() => deleteProduct(item._id)}>Delete</button>
                                    <Link to={`product/${item._id}`}>Update</Link>
                                </td>
                            </tr>
                        )
                        :
                        <tr>
                            <td colSpan={5} style={{textAlign: "center"}}>Product Not Found.</td>
                        </tr>
                    }
                </tbody>
            </table>

        </div>
    )
}