import './Products.css';
import { useContext, useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { GeneralContext } from '../App';
import Logout from '../user/Logout';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [productEdited, setProductEdited] = useState();
    const {setIsLoader, user, snackbar} = useContext(GeneralContext);

    useEffect(() => {
        setIsLoader(true);
        fetch("https://api.shipap.co.il/products", {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setIsLoader(false);
        });
    }, []);

    function removeProduct(id) {
        if (!window.confirm("are you sure?")) {
            return;
        }

        fetch(`https://api.shipap.co.il/products/${id}`, {
            credentials: 'include',
            method: 'DELETE',
        })
        .then(() => {
            setProducts(products.filter(x => x.id !== id));
        });
    }

    const update = p => {
        if (p) {
            const i = products.findIndex(x => x.id == p.id);
            products.splice(i, 1, p);
            setProducts(products);
        }

        setProductEdited();
    }

    return (
        <>  
            <div>{user.fullName} is online! <Logout /></div>
            <AddProduct added={newProduct => setProducts([...products, newProduct])} />
            <EditProduct product={productEdited} productChange={update} />

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>product's name</th>
                        <th>price</th>
                        <th>sale</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((p, i) => 
                            <tr key={p.id} onDoubleClick={() => {
                                setProductEdited(p)
                            }}>
                                <td>{i + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>{p.discount}</td>
                                <td>
                                    <button className='edit' onClick={() => setProductEdited(p)}><AiFillEdit /></button>
                                    <button className='remove' onClick={() => removeProduct(p.id)}><AiFillDelete /></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}