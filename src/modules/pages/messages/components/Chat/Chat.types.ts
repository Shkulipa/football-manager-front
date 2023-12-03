export interface IChatProps {
	id: string;
	text: string;
	onClick: (id: string) => void;
	isActive?: boolean;
}
