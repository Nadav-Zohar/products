import { useContext, useState } from 'react';
import './Products.css';
import { GeneralContext } from '../App';

export default function AddProduct({ added }) {
    const {setIsLoader, snackbar} = useContext(GeneralContext);
    const [isModal, setIsModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        discount: 0,
    });

    const inputChange = ev => {
        const { name, value } = ev.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const save = ev => {
        ev.preventDefault();

        if (!formData.name) {
            alert("ממש מצחיק");
            return;
        }

        if (!formData.price) {
            alert("ממש עצוב");
            return;
        }
        setIsLoader(true);
        fetch(`https://api.shipap.co.il/products`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            added(data);
            setIsModal(false);
            setIsLoader(false);
            snackbar("product added");
        });
    }

    return (
        <>
            <button className='addBtn' onClick={() => setIsModal(true)}>New Product +</button>

            {
                isModal &&
                <div className="modal-frame">
                    <div className="modal">
                        <header>
                            <button className="close" onClick={() => setIsModal(false)}>x</button>
                            <h2>new product</h2>
                        </header>

                        <form onSubmit={save}>
                            <label>
                                product's name:
                                <input type="text" name="name" value={formData.name} onChange={inputChange} />
                            </label>

                            <label>
                                price:
                                <input type="number" name="price" value={formData.price} onChange={inputChange} />
                            </label>

                            <label>
                                sale:
                                <input type="number" name="discount" value={formData.discount} onChange={inputChange} />
                            </label>

                            <button>add product</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}