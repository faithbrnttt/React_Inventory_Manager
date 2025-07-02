import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

const Form = ({ mode = 'create', selectedProduct, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Produce',
    });

    const clearForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'Produce',
        });
    };


    const handleDelete = () => {
        confirmAlert({
            title: 'Confirm Delete',
            message: `Are you sure you want to delete "${selectedProduct.name}"?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await axios.delete(`http://localhost:3000/products/${selectedProduct._id}`);
                            toast.success('Product deleted!');
                            onSuccess?.();
                    
                        } catch (err) {
                            console.error(err);
                            toast.error('Failed to delete');
                        }
                    },
                },
                {
                    label: 'No',
                    onClick: () => {
                        toast.info('Deletion canceled');
                        onSuccess?.();
                    },
                },
            ],
        });
    };



    useEffect(() => {
        if (mode === 'update' && selectedProduct) {
            setFormData({
                name: selectedProduct.name || '',
                description: selectedProduct.description || '',
                price: selectedProduct.price || '',
                category: selectedProduct.category || 'Produce',
            });
        } else {
            clearForm();
        }
    }, [mode, selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:3000/products';

        try {
            if (mode === 'create') {
                await axios.post(url, formData);
                toast.success('Product added!');

            } else if (mode === 'update') {
                await axios.put(`${url}/${selectedProduct._id}`, formData);
                toast.success('Product updated!');

            } else if (mode === 'delete') {
                handleDelete();
                return;
            }

            onSuccess?.();
            clearForm();

        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong';
            toast.error(msg);
        }
    };

    return (
        <form className="input-fields" onSubmit={handleSubmit}>
            {(mode === 'create' || mode === 'update') && (
                <>
                    <div className="category-container">
                        <label>Category:</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Produce">Produce</option>
                            <option value="Meat & Seafood">Meat & Seafood</option>
                            <option value="Dairy & Eggs">Dairy & Eggs</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Dry Goods">Dry Goods</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Frozen Foods">Frozen Foods</option>
                            <option value="Household Supplies">Household Supplies</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Health & Wellness">Health & Wellness</option>
                            <option value="Pet Supplies">Pet Supplies</option>
                        </select>
                    </div>
                    <label>Name:</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />

                    <label>Description:</label>
                    <input name="description" value={formData.description} onChange={handleChange} />

                    <label>Price:</label>
                    <input name="price" value={formData.price} onChange={handleChange} type="number" step="0.01" required />

                </>
            )}

            <button className="submit" type="submit">
                {mode === 'create' && 'Add Product'}
                {mode === 'update' && 'Update Product'}
                {mode === 'delete' && 'Delete Product'}
            </button>
        </form>
    );
};

export default Form;
