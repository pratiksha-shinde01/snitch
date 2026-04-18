import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 7;

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addFiles = (files) => {
        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) return;

        const newImages = Array.from(files)
            .slice(0, remaining)
            .map(file => ({
                file,
                preview: URL.createObjectURL(file),
            }));

        setImages(prev => [...prev, ...newImages]);
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        addFiles(e.dataTransfer.files);
    }, [images]);

    const removeImage = (index) => {
        setImages(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('priceAmount', formData.priceAmount);
            data.append('priceCurrency', formData.priceCurrency);

            images.forEach(img => data.append('images', img.file));

            await handleCreateProduct(data);
            navigate('/');
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-[#111]">

            <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-semibold">New Listing</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Add a new product to your store
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-[#FF8C00] hover:underline"
                    >
                        ← Back
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* LEFT SIDE */}
                        <div className="space-y-8">

                            {/* TITLE */}
                            <div>
                                <label className="text-sm text-gray-600 mb-2 block">
                                    Product Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Oversized Linen Shirt"
                                    className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#FF8C00]"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-sm text-gray-600 mb-2 block">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Describe product..."
                                    className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#FF8C00]"
                                />
                            </div>

                            {/* PRICE */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="priceAmount"
                                        value={formData.priceAmount}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#FF8C00]"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">
                                        Currency
                                    </label>
                                    <select
                                        name="priceCurrency"
                                        value={formData.priceCurrency}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#FF8C00]"
                                    >
                                        {CURRENCIES.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div>

                            <div className="flex justify-between mb-3">
                                <label className="text-sm text-gray-600">
                                    Product Images
                                </label>
                                <span className="text-sm text-gray-400">
                                    {images.length}/{MAX_IMAGES}
                                </span>
                            </div>

                            {/* DROP ZONE */}
                            {images.length < MAX_IMAGES && (
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onClick={() => fileInputRef.current.click()}
                                    className={`border border-dashed rounded-lg p-10 text-center cursor-pointer transition
                                    ${isDragging ? 'border-[#FF8C00] bg-orange-50' : 'border-gray-300 hover:bg-gray-50'}`}
                                >
                                    <p className="text-gray-600">
                                        Drag & drop or <span className="text-[#FF8C00]">browse</span>
                                    </p>

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={(e) => {
                                            addFiles(e.target.files);
                                            e.target.value = '';
                                        }}
                                        className="hidden"
                                    />
                                </div>
                            )}

                            {/* PREVIEW */}
                            {images.length > 0 && (
                                <div className="grid grid-cols-3 gap-3 mt-5">
                                    {images.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={img.preview}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center rounded-lg"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button
    type="submit"
    disabled={isSubmitting}
    className="mt-12 w-full bg-[#ea580c] text-white py-4 rounded-lg font-semibold hover:bg-[#c2410c] transition"
>
    {isSubmitting ? "Publishing..." : "Publish Product"}
</button>

                </form>
            </div>
        </div>
    );
};

export default CreateProduct;