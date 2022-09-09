import { OmitStrict } from 'type-zoo/types';

export const getBlockId = (block: Sanity.Keyed<OmitStrict<Sanity.Block, '_type'>>) => {
	return `${block._type}-${block._key}`;
};
