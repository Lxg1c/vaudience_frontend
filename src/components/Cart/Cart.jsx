import {useSelector} from "react-redux";
import '../../scss/Cart.scss'
const Cart = () => {
    const cart = useSelector(state => state.user.cart);

    console.log(cart)
    return (
        <div className="cart__container container">
            <div className='cart__content'>
                <ul className='cart__content-list'>
                    {cart.map((product) => (
                        <li key={product.id} className='cart__item'>
                            <img src={product.category.image} className='cart__item-img' alt={product.name} />
                            <h3>{product.title}</h3>

                            <h1>{product.price * 100} ₽</h1>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Cart