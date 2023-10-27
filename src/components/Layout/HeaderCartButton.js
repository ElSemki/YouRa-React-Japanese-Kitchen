import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = ({ onClick }) => {
	const [isButtonAnimated, setIsButtonAnimated] = useState(false);

	const ctx = useContext(CartContext);

	const cartItemsNumber = ctx.items.reduce((acc, item) => acc + item.amount, 0);

	const buttonClasses = `${styles.button} ${
		isButtonAnimated ? styles.bump : ''
	}`;

	useEffect(() => {
		if (!ctx.items.length) {
			return;
		}
		setIsButtonAnimated(true);

		const timer = setTimeout(() => setIsButtonAnimated(false), 300);

		return () => clearTimeout(timer);
	}, [ctx.items]);

	return (
		<button onClick={onClick} className={buttonClasses}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Корзина</span>
			<span className={styles.badge}>{cartItemsNumber}</span>
		</button>
	);
};

export default HeaderCartButton;
