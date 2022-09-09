/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentBlockProps } from '@apps/web/src/blocks/content-block/content-block';
import { internalLinkFixture } from '@apps/web/src/services/sanity/__fixtures__/link.fixture';
import { getMediaFixture } from '@apps/web/src/services/sanity/__fixtures__/media.fixture';
import { simpletextFixture } from '@apps/web/src/services/sanity/__fixtures__/simpletext.fixture';

export const contentBlockFixture: ContentBlockProps['blocks'] = [
	{
		_key: '952f21bdb5ec',
		_type: 'heroBlock',
		backgroundImage: getMediaFixture({ index: 2, type: 'image' }),
		cta: internalLinkFixture,
		foregroundImage: getMediaFixture({ index: 0, type: 'image' }),
		title: 'Lorem ipsum dolor sit amet',
	},
	{
		_key: 'eae511fe6ade7624c106ffd3e6e377d0',
		_type: 'columnsBlock',
		content: [
			{
				_key: '053c74d3d61c',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ index: 1, type: 'image' }),
				subtitle: simpletextFixture as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
			{
				_key: 'e0771514e3ee0a6dd387d6d5cabb03ed',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ index: 0, type: 'image' }),
				subtitle: simpletextFixture as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
			{
				_key: 'b0e0139d1c76b28c8d7c8092af34e5f2',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ index: 2, type: 'image' }),
				subtitle: simpletextFixture as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
		],
		cta: internalLinkFixture,
		title: 'Lorem ipsum dolor sit amet, consect',
	},
	{
		_key: '1297e1a930cb',
		_type: 'richTextBlock',
		richtext: [
			{
				_key: 'd1b544912abf',
				_type: 'block',
				children: [
					{
						_key: '4cffcec227530',
						_type: 'span',
						marks: [],
						text: 'Audit Committee',
					},
				],
				markDefs: [],
				style: 'h4',
			},
			{
				_key: '248922cc0f62',
				_type: 'block',
				children: [
					{
						_key: 'a4952f742825',
						_type: 'span',
						marks: [],
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant nulla at magna iaculis amet ornare pulvinar bibendum. Erat in in urna massa. Quam purus in et elementum vestibulum lacinia a. Blandit non amet, non viverra a massa malesuada pellentesque elit. Arcu semper accumsan, ut nibh sem sit neque. Neque, eget diam amet suscipit. Vitae ornare blandit ultricies varius. Ante nisi, donec id lectus mattis vestibulum, pretium mauris hendrerit. Faucibus sed tincidunt urna ultricies lectus.',
					},
				],
				markDefs: [],
				style: 'normal',
			},
			{
				_key: '63f308259f7c',
				_type: 'image',
				asset: {
					_ref: 'image-970b0fe71882b2589ce325d2f7208bb23bf25ab4-900x450-png',
					_type: 'reference',
				},
				blockOptions: {
					widerThanText: true,
				},
			},
			{
				_key: '83a3ac030854',
				_type: 'block',
				children: [
					{
						_key: 'b60e7ad6a7fb0',
						_type: 'span',
						marks: [],
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris quisque pulvinar feugiat tellus eleifend suspendisse mauris lobortis. Aliquam amet bibendum commodo purus. Pellentesque aliquet pharetra purus, amet dignissim imperdiet sem. Dictum pellentesque commodo ultrices id eget risus. Tortor quis cursus aliquet ut arcu commodo luctus in semper. Convallis nec massa sit convallis enim lacus. Diam ut magna turpis quisque mi at. Volutpat et bibendum senectus amet. Lorem in auctor vel elementum, faucibus facilisi massa diam. Interdum ultricies eu eu leo, lectus interdum. Dignissim viverra viverra enim pretium, fames aliquam. Erat massa pellentesque mi, ultrices. Eget varius a elit nunc etiam euismod at accumsan. Bibendum pellentesque at in turpis enim orci tortor lectus tincidunt. Sed ut odio nunc pulvinar nulla mattis elementum.',
					},
				],
				markDefs: [],
				style: 'normal',
			},
			{
				_key: '569d8a459fb9',
				_type: 'button',
				blockOptions: {
					alignment: 'left',
					size: 'small',
					variant: 'fill',
				},
				link: internalLinkFixture,
			} as any,
			{
				_key: 'a861598bb4ee',
				_type: 'block',
				children: [
					{
						_key: '9bbed61ab72c0',
						_type: 'span',
						marks: [],
						text: 'References',
					},
				],
				markDefs: [],
				style: 'h5',
			},
			{
				_key: 'cafc74972be4',
				_type: 'block',
				children: [
					{
						_key: 'd70607e0562d',
						_type: 'span',
						marks: [],
						text: 'Therming, C. et al. Low Diagnostic Yield of Non-Invasive Testing in Patients with Suspected Coronary Artery Disease: Results From a Large Unselected Hospital-Based Sample. Eur Heart J – Qual Care Clin Outcomes 2018: 4, 301-308',
					},
				],
				level: 1,
				listItem: 'number',
				markDefs: [],
				style: 'normal',
			},
			{
				_key: 'f2b6f5c37a9c',
				_type: 'block',
				children: [
					{
						_key: 'c0fe3ac26800',
						_type: 'span',
						marks: [],
						text: 'Winther, S. et al. Diagnostic performance of an acoustic-based system for coronary artery disease risk stratification. Heart 2018: 104, 928-935',
					},
				],
				level: 1,
				listItem: 'number',
				markDefs: [],
				style: 'normal',
			},
			{
				_key: 'f477d207868a',
				_type: 'block',
				children: [
					{
						_key: '7a99761222e9',
						_type: 'span',
						marks: [],
						text: 'Douglas, PS et al. Outcomes of anatomical versus functional testing for coronary artery disease. N Engl J Med 2015: 372, 1291-1300',
					},
				],
				level: 1,
				listItem: 'number',
				markDefs: [],
				style: 'normal',
			},
			{
				_key: 'ad52d3d31e06',
				_type: 'block',
				children: [
					{
						_key: '555ebdd44ade',
						_type: 'span',
						marks: [],
						text: 'Patel, MR. et al. (2010) Low diagnostic yield of elective coronary angiography. N. Engl. J. Med. 362, 886–895',
					},
				],
				level: 1,
				listItem: 'number',
				markDefs: [],
				style: 'normal',
			},
			{
				_key: '4e7b8c4cbdfd',
				_type: 'block',
				children: [
					{
						_key: '61df0325e352',
						_type: 'span',
						marks: [],
						text: 'Juarez-Orozco LE, et al. Impact of a decreasing pre-test probability on the performance of diagnostic tests for coronary artery disease. Eur Heart J Cardiovasc Imaging. 2019:20, 1198-1207.',
					},
				],
				level: 1,
				listItem: 'number',
				markDefs: [],
				style: 'normal',
			},
		],
		title: 'Lorem ipsum dolor sit amet. Diam consequat aliquam metus ',
	},
	{
		_key: '9d501b1c9066759a7c87f0bec8160f9a',
		_type: 'columnsBlock',
		content: [
			{
				_key: '053c74d3d61c',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ index: 2, type: 'image' }),
				subtitle: simpletextFixture as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
			{
				_key: 'e0771514e3ee0a6dd387d6d5cabb03ed',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ index: 0, type: 'image' }),
				subtitle: simpletextFixture as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
			{
				_key: 'b0e0139d1c76b28c8d7c8092af34e5f2',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ index: 1, type: 'image' }),
				subtitle: simpletextFixture as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
		],
		cta: internalLinkFixture,
		title: 'Lorem ipsum dolor sit amet, consect',
	},
	{
		_key: '308846b14f2f',
		_type: 'breakerBlock',
		backgroundImage: getMediaFixture({ index: 1, type: 'image' }),
		blockOptions: {
			variants: 'text-left',
		},
		content: [
			{
				_key: 'ae702535c679',
				_type: 'block',
				children: [
					{
						_key: '3ece9507d2cc0',
						_type: 'span',
						marks: [],
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada ornare est sed sem elementum mattis. Nunc in risus, tristique leo purus aliquet in faucibus.',
					},
				],
				markDefs: [],
				style: 'normal',
			},
		],
		cta: internalLinkFixture,
		foregroundImage: getMediaFixture({ index: 2, type: 'image' }),
		title: 'Lorem ipsum dolor sit amet, consect',
	},
	{
		_key: '615fca710a2dda75543243c7272abce1',
		_type: 'breakerBlock',
		backgroundImage: getMediaFixture({ index: 1, type: 'image' }),
		blockOptions: {
			variants: 'text-right',
		},
		content: [
			{
				_key: 'ae702535c679',
				_type: 'block',
				children: [
					{
						_key: '3ece9507d2cc0',
						_type: 'span',
						marks: [],
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada ornare est sed sem elementum mattis. Nunc in risus, tristique leo purus aliquet in faucibus.',
					},
				],
				markDefs: [],
				style: 'normal',
			},
		],
		cta: internalLinkFixture,
		foregroundImage: getMediaFixture({ index: 0, type: 'image' }),
		title: 'Lorem ipsum dolor sit amet, consect',
	},
	{
		_key: '1d402daceadf278d957eac49fb1e12e7',
		_type: 'columnsBlock',
		content: [
			{
				_key: '053c74d3d61c',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ index: 0, type: 'image' }),
				subtitle: simpletextFixture as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
			{
				_key: 'e0771514e3ee0a6dd387d6d5cabb03ed',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ index: 1, type: 'image' }),
				subtitle: simpletextFixture as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
			{
				_key: 'b0e0139d1c76b28c8d7c8092af34e5f2',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ index: 2, type: 'image' }),
				subtitle: simpletextFixture as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
		],
		cta: internalLinkFixture,
		title: 'Lorem ipsum dolor sit amet, consect',
	},
];
