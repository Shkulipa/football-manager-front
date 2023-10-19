interface IProps {
	touched: boolean;
	error?: string;
}

type TGetFieldError = ({ touched, error }: IProps) => string;

export const getFieldError: TGetFieldError = ({ touched, error }) => {
	if (!touched || !error) return '';
	return error;
};
