export interface SanityMuxVideo {
	asset: Asset;
	settings: {
		controls: boolean;
		muted: boolean;
		autoPlay: boolean;
		loop: boolean;
	};
}

interface Asset {
	playbackId: string;
}
