import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';

const Cart = ({ onHideCart }) => {
	const ctx = useContext(CartContext);

	const totalAmount = `$${Math.abs(ctx.totalAmount).toFixed(2)}`;
	const hasItems = ctx.items.length > 0;

	const addCartItemHandler = item => ctx.addItem({ ...item, amount: 1 });
	const removeCartItemHandler = id => ctx.removeItem(id);

	const cartItems = ctx.items.map(item => (
		<CartItem
			key={item.id}
			{...item}
			onAdd={addCartItemHandler.bind(null, item)}
			onRemove={removeCartItemHandler.bind(null, item.id)}
		/>
	));

	return (
		<Modal onClick={onHideCart}>
			<ul className={styles['cart-items']}>{cartItems}</ul>
			<div className={styles.total}>
				<span>Итого</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button className={styles['button--alt']} onClick={onHideCart}>
					Закрыть
				</button>
				{hasItems && <button className={styles.button}>Заказать</button>}
			</div>
		</Modal>
	);
};

export default Cart;
