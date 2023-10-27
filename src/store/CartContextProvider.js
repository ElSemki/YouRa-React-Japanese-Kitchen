import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (prevState, action) => {
	if (action.type === 'ADD_ITEM') {
		const updatedTotalAmount =
			prevState.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = prevState.items.findIndex(
			el => el.id === action.item.id
		);

		const existingCardItem = prevState.items[existingCartItemIndex];

		let updatedItem, updatedItems;

		if (existingCardItem) {
			updatedItem = {
				...existingCardItem,
				amount: existingCardItem.amount + action.item.amount,
			};

			updatedItems = [...prevState.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItem = { ...action.item };
			updatedItems = [...prevState.items, updatedItem];
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === 'REMOVE_ITEM') {
		const existingCartItemIndex = prevState.items.findIndex(
			el => el.id === action.id
		);

		const existingCardItem = prevState.items[existingCartItemIndex];

		const updatedTotalAmount = prevState.totalAmount - existingCardItem.price;

		let updatedItems;

		if (existingCardItem.amount === 1) {
			updatedItems = prevState.items.filter(item => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingCardItem,
				amount: existingCardItem.amount - 1,
			};
			updatedItems = [...prevState.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	return defaultCartState;
};

const CartContextProvider = props => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	const addItemHandler = item =>
		dispatchCartAction({ type: 'ADD_ITEM', item: item });

	const removeItemHandler = id =>
		dispatchCartAction({ type: 'REMOVE_ITEM', id: id });

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
