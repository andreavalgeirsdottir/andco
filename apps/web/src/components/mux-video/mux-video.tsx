import classNames from 'classnames';
import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

import { SanityMuxVideo } from '@web/services/sanity/queries/muxVideo';

import styles from './mux-video.module.scss';

export interface MuxVideoProps {
	video: SanityMuxVideo;
	className?: string;
}

export function MuxVideo({ video, className, ...rest }: MuxVideoProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const autoPlay = video.settings?.autoPlay ?? true;
	const loop = video.settings?.loop ?? true;
	const muted = video.settings?.muted ?? true;
	const controls = video.settings?.controls ?? false;

	useEffect(() => {
		let hls: Hls;

		if (videoRef.current) {
			const vid = videoRef.current;

			if (vid.canPlayType('application/vnd.apple.mpegurl')) {
				// Some browers (safari and ie edge) support HLS natively
				vid.src = `https://stream.mux.com/${video.asset.playbackId}.m3u8`;
			} else if (Hls.isSupported()) {
				// This will run in all other modern browsers
				hls = new Hls();
				hls.loadSource(`https://stream.mux.com/${video.asset.playbackId}.m3u8`);
				hls.attachMedia(vid);
			} else {
				console.error("This is a legacy browser that doesn't support MSE");
				vid.src = `https://stream.mux.com/${video.asset.playbackId}/high.mp4`;
			}
		}

		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	}, [video.asset.playbackId, videoRef, autoPlay]);

	return (
		<span className={classNames(styles.container, className)}>
			<span className={styles.insert} />
			<video
				playsInline={true}
				poster={
					video.asset.playbackId ? `https://image.mux.com/${video.asset.playbackId}/thumbnail.jpg?time=1` : undefined
				}
				controls={controls}
				ref={videoRef}
				muted={muted}
				autoPlay={autoPlay}
				loop={loop}
				preload="auto"
				className={styles.video}
				{...rest}
			/>
		</span>
	);
}

export default MuxVideo;
