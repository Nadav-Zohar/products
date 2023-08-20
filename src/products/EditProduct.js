import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../App";

export default function EditProduct({ product, productChange }) {
    const [formData, setFormData] = useState();
    const {setIsLoader, snackbar} = useContext(GeneralContext);


    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData();
        }
    }, [product]);

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
            alert("no name?");
            return;
        }

        if (!formData.price) {
            alert("no price?");
            return;
        }
        setIsLoader(true);
        fetch(`https://api.shipap.co.il/products/${product.id}`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(() => {
            productChange(formData);
            setIsLoader(false);
            snackbar("product edited");
        });
    }

    return (
        <>
            {
                formData &&
                <div className="modal-frame">
                    <div className="modal">
                        <header>
                            <button className="close" onClick={() => productChange()}>x</button>
                            <h2>edit product</h2>
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

                            <button>save product</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}