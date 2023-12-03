import { IOpenPackRes } from '@/api/rest/inventory/types/open-pack';

export interface IResultOpenPackProps {
	result: IOpenPackRes;
	closeOpenResult: () => void;
}
