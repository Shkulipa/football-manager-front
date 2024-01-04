import * as Yup from 'yup';

export const auctionCreateLotValidation = Yup.object().shape({
	playerId: Yup.string()
		.matches(/^[a-fA-F0-9]{24}$/, 'Should be a valid Mongo ID')
		.min(1, 'Please pick player'),
	price: Yup.number()
		.typeError('Must be number')
		.min(10, 'Max Price should be greater than or equal to 10')
});
