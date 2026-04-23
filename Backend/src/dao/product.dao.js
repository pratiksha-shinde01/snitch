import productModel from "../models/products.model.js";

export const stockOfVariant = async (productId, variantId) => {
    const product = await productModel.findById(productId);

    if (!product) return 0;

    const variant = product.variants.find(
        v => v._id.toString() === variantId
    );

    return variant?.stock || 0;
};