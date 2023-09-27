type THandler = () => void;

export interface ISingleMatchActionsProps {
	hostsHandler: THandler;
	aiHandler: THandler;
	guestsHandler: THandler;
}
