import classNames from 'classnames';
import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

import { SanityVimeoSettings, SanityVimeoVideo } from '@apps/web/src/services/sanity/queries/vimeoVideo';

import styles from './vimeo-video.module.scss';

export interface VimeoVideoProps {
	video: SanityVimeoVideo;
	className?: string;
	settings?: SanityVimeoSettings;
}

export function VimeoVideo({ video, className, settings, ...rest }: VimeoVideoProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const autoPlay = settings?.autoPlay ?? true;
	const loop = settings?.loop ?? true;
	const controls = settings?.controls ?? true;
	const muted = settings?.muted ?? true;

	useEffect(() => {
		let hls: Hls;

		if (!video?.asset?.playbackSrc) {
			console.warn('You need to provide a playbackSrc for the video');
			return;
		}

		if (videoRef.current) {
			const vid = videoRef.current;
			if (vid.canPlayType('application/vnd.apple.mpegurl')) {
				// Some browers (safari and ie edge) support HLS natively
				vid.src = video.asset.playbackSrc;
			} else if (Hls.isSupported()) {
				// This will run in all other modern browsers
				hls = new Hls();
				hls.loadSource(video?.asset?.playbackSrc);
				hls.attachMedia(vid);
			} else {
				console.error("This is a legacy browser that doesn't support MSE");
				vid.src = video.asset.fallbackPlaybackSrc;
			}
		}

		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	}, [video?.asset?.playbackSrc, videoRef, autoPlay, video?.asset?.fallbackPlaybackSrc]);

	return (
		<span className={classNames(styles.container, className)}>
			<span className={styles.insert} />
			<video
				playsInline={true}
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

export default VimeoVideo;
