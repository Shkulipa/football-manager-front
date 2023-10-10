import { BtnIcon } from '@/components';
import styles from './Playback.module.scss';
import { IPlaybackProps } from './Playback.types';
import { Pause } from '@/icons/Pause';
import { Play } from '@/icons/Play';

export function Playback({
	isPlay,
	handlerPlayback,
	isOverMatch
}: IPlaybackProps): JSX.Element {
	const playbackIcon = isPlay ? <Pause /> : <Play />;

	return (
		<BtnIcon
			onClick={handlerPlayback}
			className={styles.playbackBtn}
			disabled={isOverMatch}
		>
			{playbackIcon}
		</BtnIcon>
	);
}
