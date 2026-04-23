import { 
    addItem, 
    getCart, 
    incrementCartItemApi,
    decrementCartItemApi,
    removeCartItemApi
} from "../service/cart.api"

import { useDispatch } from "react-redux"
import { 
    setItems, 
    incrementCartItem, 
    decrementCartItem, 
    removeCartItem 
} from "../state/cart.slice"

export const useCart = () => {

    const dispatch = useDispatch()

    async function handleAddItem({ productId, variantId }) {
        await addItem({ productId, variantId })
        await handleGetCart()
    }

    async function handleGetCart() {
        const data = await getCart()
        dispatch(setItems(data.cart.items))
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        await incrementCartItemApi({ productId, variantId })
        await handleGetCart()
    }

    async function handleDecrementCartItem({ productId, variantId }) {
        await decrementCartItemApi({ productId, variantId })
        await handleGetCart()
    }

    async function handleRemoveItem({ productId, variantId }) {
        await removeCartItemApi({ productId, variantId })
        await handleGetCart()
    }

    return { 
        handleAddItem, 
        handleGetCart, 
        handleIncrementCartItem, 
        handleDecrementCartItem, 
        handleRemoveItem 
    }
}