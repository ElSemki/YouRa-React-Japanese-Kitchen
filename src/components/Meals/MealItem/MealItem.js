import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = props => {
	const { id, name, description, price } = props;

	const ctx = useContext(CartContext);

	const formattedPrice = `$${price.toFixed(2)}`;

	const addToCardHandler = amount =>
		ctx.addItem({ id: id, name: name, amount: amount, price: price });

	return (
		<li className={styles.meal}>
			<div>
				<h3>{name}</h3>
				<div className={styles.description}>{description}</div>
				<div className={styles.price}>{formattedPrice}</div>
			</div>
			<div>
				<MealItemForm onAddToCart={addToCardHandler} id={id} />
			</div>
		</li>
	);
};

export default MealItem;
