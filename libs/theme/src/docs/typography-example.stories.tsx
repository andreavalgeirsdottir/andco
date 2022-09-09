import { Meta, Story } from '@storybook/react';
import React from 'react';

import styles from './typography.stories.module.scss';

export default {
	title: 'Theme/Examples',
} as Meta;

export const Typography: Story = () => {
	return (
		<main className={styles.main}>
			<h2>Sit et cursus lobortis consequat </h2>
			<p>
				mus torquent vivamus porttitor nec dui conubia consectetur tempor vel vitae dignissim, orci litora
				malesuada potenti dapibus fermentum facilisis taciti ligula eleifend egestas ex erat pretium. Dictum
				dignissim dui nascetur maecenas bibendum placerat ornare taciti inceptos potenti ultrices et
				imperdiet, egestas penatibus platea semper ligula sagittis dictumst facilisis magnis praesent amet
				cubilia. Etiam habitasse pulvinar id eros vitae cras mi potenti lorem mauris, magnis mollis tortor
				maximus fames platea ad blandit.
			</p>
			<h4>Sit et cursus lobortis </h4>
			<p>
				consequat mus torquent vivamus porttitor nec dui conubia consectetur tempor vel vitae dignissim, orci
				litora malesuada potenti dapibus fermentum facilisis taciti ligula eleifend egestas ex erat pretium.
				Dictum dignissim dui nascetur maecenas bibendum placerat ornare taciti inceptos potenti ultrices et
				imperdiet, egestas penatibus
			</p>
			<ul>
				<li>platea semper ligula sagittis </li>
				<li>dictumst facilisis magnis praesent amet cubilia. </li>
				<li>Etiam habitasse pulvinar id eros </li>
				<li>vitae cras mi potenti lorem mauris, magnis mollis tortor </li>
				<li>maximus fames platea ad blandit.</li>
			</ul>
			<h3>Sit et cursus lobortis consequat mus</h3>
			<p>
				torquent vivamus porttitor nec dui conubia consectetur tempor vel vitae dignissim, orci litora
				malesuada potenti dapibus fermentum facilisis taciti ligula eleifend egestas ex erat pretium.
			</p>
			<p>
				Dictum dignissim dui nascetur maecenas bibendum placerat ornare taciti inceptos potenti ultrices et
				imperdiet, egestas penatibus platea semper ligula sagittis dictumst facilisis magnis praesent amet
				cubilia. Etiam habitasse pulvinar id eros vitae cras mi potenti lorem mauris, magnis mollis tortor
				maximus fames platea ad blandit.
			</p>
			<h5>Sit et cursus lobortis consequat mus torquent </h5>
			<p>
				vivamus porttitor nec dui conubia consectetur tempor vel vitae dignissim, orci litora malesuada
				potenti dapibus fermentum facilisis taciti
			</p>
			<blockquote>ligula eleifend egestas ex erat pretium. </blockquote>
			<p>
				Dictum dignissim dui nascetur maecenas bibendum placerat ornare taciti inceptos potenti ultrices et
				imperdiet, egestas penatibus platea semper ligula sagittis dictumst facilisis magnis praesent amet
				cubilia.
			</p>
			<p>
				Etiam habitasse pulvinar id eros vitae cras mi potenti lorem mauris, magnis mollis tortor maximus
				fames platea ad blandit.
			</p>
			<h4>Sit et cursus lobortis consequat mus torquent </h4>
			<p>
				vivamus porttitor nec dui conubia consectetur tempor vel vitae dignissim, orci litora malesuada
				potenti dapibus fermentum facilisis taciti ligula eleifend egestas ex erat pretium. Dictum dignissim
				dui nascetur maecenas bibendum placerat ornare taciti inceptos potenti ultrices et imperdiet, egestas
				penatibus platea semper ligula sagittis dictumst facilisis magnis praesent amet cubilia. Etiam
				habitasse pulvinar id eros vitae cras mi potenti lorem mauris, magnis mollis tortor maximus fames
				platea ad blandit.
			</p>
		</main>
	);
};
