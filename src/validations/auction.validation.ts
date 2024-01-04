import {
	maxAgePlayer,
	maxRatingPlayer,
	maxSkillPlayer,
	minAgePlayer,
	minRatingPlayer,
	minSkillPlayer
} from '@/constants/footballsimulationengine/common-player-values';
import * as Yup from 'yup';

export const auctionValidation = Yup.object().shape({
	search: Yup.string().matches(
		new RegExp(/^[a-zA-Z]*$/),
		'Name should only contain letters or digits'
	),
	priceFrom: Yup.number()
		.typeError('Must be number')
		.min(10, 'Min Price should be greater than or equal to 0'),
	priceTo: Yup.number()
		.typeError('Must be number')
		.min(0, 'Max Price should be greater than or equal to 0')
		.test(
			'is-greater',
			'Max Price should be greater than or equal to Min Price',
			function (value) {
				const { priceFrom } = this.parent;
				return (
					priceFrom === undefined || value === undefined || value >= priceFrom
				);
			}
		),
	ratingFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minRatingPlayer,
			`Min Price should be greater than or equal to ${minRatingPlayer}`
		)
		.max(
			maxRatingPlayer,
			`Min Price should be not greater than ${maxRatingPlayer}`
		),
	ratingTo: Yup.number()
		.typeError('Must be number')
		.min(
			minRatingPlayer,
			`Max Rating should be greater than or equal to ${minRatingPlayer}`
		)
		.max(
			maxRatingPlayer,
			`Min Rating should be not greater than ${maxRatingPlayer}`
		)
		.test(
			'is-greater',
			'Max Rating should be greater than or equal to Min Rating',
			function (value) {
				const { ratingFrom } = this.parent;
				return (
					ratingFrom === undefined || value === undefined || value >= ratingFrom
				);
			}
		),
	ageFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minAgePlayer,
			`Min Age should be greater than or equal to ${minAgePlayer}`
		)
		.max(maxAgePlayer, `Min Age should be not greater than ${maxAgePlayer}`),
	ageTo: Yup.number()
		.typeError('Must be number')
		.min(
			minAgePlayer,
			`Max Age should be greater than or equal to ${minAgePlayer}`
		)
		.max(maxAgePlayer, `Min Age should be not greater than ${maxAgePlayer}`)
		.test(
			'is-greater',
			'Max Age should be greater than or equal to Min Age',
			function (value) {
				const { ageFrom } = this.parent;
				return ageFrom === undefined || value === undefined || value >= ageFrom;
			}
		),

	// skills
	agilityFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Min Agility should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Agility should be not greater than ${maxSkillPlayer}`
		),
	agilityTo: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Max Agility should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Agility should be not greater than ${maxSkillPlayer}`
		)
		.test(
			'is-greater',
			'Max Agility should be greater than or equal to Min Agility',
			function (value) {
				const { agilityFrom } = this.parent;
				return (
					agilityFrom === undefined ||
					value === undefined ||
					value >= agilityFrom
				);
			}
		),
	jumpingFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Min Jumping should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Jumping should be not greater than ${maxSkillPlayer}`
		),
	jumpingTo: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Max Jumping should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Jumping should be not greater than ${maxSkillPlayer}`
		)
		.test(
			'is-greater',
			'Max Jumping should be greater than or equal to Min Jumping',
			function (value) {
				const { jumpingFrom } = this.parent;
				return (
					jumpingFrom === undefined ||
					value === undefined ||
					value >= jumpingFrom
				);
			}
		),
	penaltyTakingFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Min Penalty Taking should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Penalty Taking should be not greater than ${maxSkillPlayer}`
		),
	penaltyTakingTo: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Max Penalty Taking should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Penalty Taking should be not greater than ${maxSkillPlayer}`
		)
		.test(
			'is-greater',
			'Max Penalty Taking should be greater than or equal to Min Penalty Taking',
			function (value) {
				const { penaltyTakingFrom } = this.parent;
				return (
					penaltyTakingFrom === undefined ||
					value === undefined ||
					value >= penaltyTakingFrom
				);
			}
		),
	savingFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Min Saving should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Saving should be not greater than ${maxSkillPlayer}`
		),
	savingTo: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Max Saving should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Saving should be not greater than ${maxSkillPlayer}`
		)
		.test(
			'is-greater',
			'Max Saving should be greater than or equal to Min Saving',
			function (value) {
				const { savingFrom } = this.parent;
				return (
					savingFrom === undefined || value === undefined || value >= savingFrom
				);
			}
		),
	passingFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Min Passing should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Passing should be not greater than ${maxSkillPlayer}`
		),
	passingTo: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Max Passing should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Passing should be not greater than ${maxSkillPlayer}`
		)
		.test(
			'is-greater',
			'Max Passing should be greater than or equal to Min Passing',
			function (value) {
				const { passingFrom } = this.parent;
				return (
					passingFrom === undefined ||
					value === undefined ||
					value >= passingFrom
				);
			}
		),
	shootingFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Min Shooting should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Shooting should be not greater than ${maxSkillPlayer}`
		),
	shootingTo: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Max Shooting should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Shooting should be not greater than ${maxSkillPlayer}`
		)
		.test(
			'is-greater',
			'Max Shooting should be greater than or equal to Min Shooting',
			function (value) {
				const { shootingFrom } = this.parent;
				return (
					shootingFrom === undefined ||
					value === undefined ||
					value >= shootingFrom
				);
			}
		),
	tacklingFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Min Tackling should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Tackling should be not greater than ${maxSkillPlayer}`
		),
	tacklingTo: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Max Tackling should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Tackling should be not greater than ${maxSkillPlayer}`
		)
		.test(
			'is-greater',
			'Max Tackling should be greater than or equal to Min Tackling',
			function (value) {
				const { tacklingFrom } = this.parent;
				return (
					tacklingFrom === undefined ||
					value === undefined ||
					value >= tacklingFrom
				);
			}
		),
	strengthFrom: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Min Strength should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Strength should be not greater than ${maxSkillPlayer}`
		),
	strengthTo: Yup.number()
		.typeError('Must be number')
		.min(
			minSkillPlayer,
			`Max Strength should be greater than or equal to ${minSkillPlayer}`
		)
		.max(
			maxSkillPlayer,
			`Min Strength should be not greater than ${maxSkillPlayer}`
		)
		.test(
			'is-greater',
			'Max Strength should be greater than or equal to Min Strength',
			function (value) {
				const { strengthFrom } = this.parent;
				return (
					strengthFrom === undefined ||
					value === undefined ||
					value >= strengthFrom
				);
			}
		)
});
