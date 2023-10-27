import img from '../../assets/[s1.eground.org] 003 sushi.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = ({ onShowCart }) => {
	return (
		<>
			<header className={styles.header}>
				<h1>Япона Кухня</h1>
				<HeaderCartButton onClick={onShowCart} />
			</header>
			<div className={styles['main-image']}>
				<img src={img} alt="Sushi" />
			</div>
		</>
	);
};

export default Header;
