import { Object } from 'ts-toolbelt';

export type Overwrite<O extends object | undefined, O1 extends object> = O extends undefined
	? undefined
	: Object.Overwrite<Defined<O>, O1>;

export type OverwriteArray<O extends object[] | undefined, O1 extends object> = O extends undefined
	? undefined
	: Object.Overwrite<Defined<O>[number], O1>[];

export type Defined<T extends unknown | undefined> = Exclude<T, undefined>;

export type Slug = Sanity.Schema.Page['slug'];
