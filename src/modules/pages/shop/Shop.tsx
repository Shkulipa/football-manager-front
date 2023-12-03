import { PaddingContainer } from '@/containers';
import { Pack } from './components/Pack/Pack';
import styles from './styles/Shop.module.scss';
import { IPackProps } from './components/Pack/Pack.types';

const STRIPE_PRODUCT_MONEY = process.env.NEXT_PUBLIC_STRIPE_PRODUCT_MONEY || '';
const STRIPE_PRODUCT_PACK_BRONZE =
	process.env.NEXT_PUBLIC_STRIPE_PRODUCT_PACK_BRONZE || '';
const STRIPE_PRODUCT_PACK_SILVER =
	process.env.NEXT_PUBLIC_STRIPE_PRODUCT_PACK_SILVER || '';
const STRIPE_PRODUCT_PACK_GOLD =
	process.env.NEXT_PUBLIC_STRIPE_PRODUCT_PACK_GOLD || '';

const products: IPackProps[] = [
	{
		name: 'Money',
		description: ['money: 50000'],
		price: '1',
		priceStripeId: STRIPE_PRODUCT_MONEY
	},
	{
		name: 'Bronze',
		description: [
			'players: 2 - 4',
			'rating players(in stars): 1 - 2',
			'money: 500 - 2000'
		],
		price: '1',
		priceStripeId: STRIPE_PRODUCT_PACK_BRONZE
	},
	{
		name: 'Silver',
		description: [
			'players: 3 - 5',
			'rating players(in stars): 1 - 3',
			'money: 2000 - 5000'
		],
		price: '2',
		priceStripeId: STRIPE_PRODUCT_PACK_SILVER
	},
	{
		name: 'Gold',
		description: [
			'players: 4 - 6',
			'rating players(in stars): 1 - 5',
			'money: 5000 - 10000'
		],
		price: '3',
		priceStripeId: STRIPE_PRODUCT_PACK_GOLD
	}
];

export const Shop = (): JSX.Element => {
	return (
		<PaddingContainer>
			<div className={styles.shopWrapper}>
				{products.map(p => (
					<Pack
						key={p.name}
						name={p.name}
						description={p.description}
						price={p.price}
						priceStripeId={p.priceStripeId}
					/>
				))}
			</div>
		</PaddingContainer>
	);
};
