import { ChangeEvent, useRef, useState } from 'react';

interface IUseFileUploadProps {
	isPreview?: boolean;
	size?: number;
	onCustomChange?: (file: File) => void;
	isRequired?: boolean;
}

export const useFileUpload = ({
	isPreview,
	size = 2 * 1e6,
	onCustomChange
}: IUseFileUploadProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [preview, setPreview] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string>('');

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !e.target.files[0]) return;
		setError('');

		if (size && e.target.files[0].size > size) {
			setError('File too large. Maximum available size: 2 Mb');
			return;
		}

		if (onCustomChange) onCustomChange(e.target.files[0]);
		setFile(e.target.files[0]);

		if (isPreview && e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	return { file, preview, inputRef, onChange, error };
};
