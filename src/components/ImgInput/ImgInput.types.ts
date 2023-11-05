import { ChangeEvent, RefObject } from 'react';

export interface IImgInputProps {
	preview?: string;
	labelInput: string;
	inputRef: RefObject<HTMLInputElement>;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	msgError?: string;
}
