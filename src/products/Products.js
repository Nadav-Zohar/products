import { useEffect } from 'react';
import './Products.css';
import { useState } from 'react';
import { AiFillDelete } from "react-icons/ai";

export default function Products() {
    const [products, setProducts]= useState([]);

    useEffect(() =>{
        fetch("https://api.shipap.co.il/products", {
        credentials:"include",
    })
    .then(res => res.json())
    .then(data => {
        setProducts(data);
    })
    }, []);
    
    function removeProduct(id) {
        fetch(`https://api.shipap.co.il/products/${id}`, {
            credentials: 'include',
            method: 'DELETE',
        })
        .then(() => {
            const newProducts= products.filter(p => p.id !== id);
            setProducts(newProducts)
        });
    }
    
    
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Discount</th>
                    <th>Product Time</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((p, i) => 
                <tr key={p.id}>
                    <td>{i +1}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.discount}</td>
                    <td>{p.time}</td>
                    <td>
                        <button className='remove' onClick={() => removeProduct(p.id)}><AiFillDelete /></button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}

