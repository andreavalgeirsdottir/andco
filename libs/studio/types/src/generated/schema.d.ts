/// <reference types="@sanity-codegen/types" />

declare namespace Sanity {
	namespace Schema {
		/**
			 * Site information
Site information like name, subtitle, etc. This will be consumed in different places in the frontend
			 */
		interface SiteInformationDocument extends Sanity.Document {
			_type: "siteInformationDocument";

			/**
			 * Site Title - `String`
			 */
			title?: string;

			/**
			 * Site Subtitle - `String`
			 */
			subtitle?: string;
		}

		/**
			 * Company Information
All information globally related to the company (address, phone numbers etc)
			 */
		interface CompanyInformationDocument extends Sanity.Document {
			_type: "companyInformationDocument";

			/**
			 * Name - `String`
			 */
			name: string;

			/**
			 * Email - `String`
			 */
			email?: string;

			/**
			 * Address - `RegistryReference`
			 */
			address?: AddressObject;
		}

		/**
			 * Catch All Slugs
Slugs which should be catched if not found and redirected to this page. Prioritized from top and downwards
			 */
		interface CatchAllSlugsDocument extends Sanity.Document {
			_type: "catchAllSlugsDocument";

			/**
			 * Slugs - `Array`
			 */
			slugs?: Array<
				Sanity.Keyed<{
					_type: "catched_slug";

					/**
			 * Catch - `Array`
The slugs that you want to catch and then redirect to the redirect field below (Supports RegExp)
			 */
					catchSlug?: Array<Sanity.Keyed<string>>;

					/**
					 * Redirect - `RegistryReference`
					 */
					redirect?: InternalLink;
				}>
			>;
		}

		/**
		 * Global Tracking
		 */
		interface Tracking extends Sanity.Document {
			_type: "tracking";

			/**
			 * GTM - `Object`
Configuration for Google Tag Manager
			 */
			gtm?: {
				/**
			 * ID - `String`
Should include the "GTM-" part
			 */
				value?: string;

				/**
			 * Enable GTM - `Boolean`
Whether GTM should be activate or not
			 */
				enabled?: boolean;
			};
		}

		/**
		 * Seo
		 */
		interface GlobalSeoDocument extends Sanity.Document {
			_type: "globalSeoDocument";

			/**
			 * SEO - `RegistryReference`
These are the default og: tags, which will act as fallback values
			 */
			seo: Seo;
		}

		/**
		 * Employee
		 */
		interface Employee extends Sanity.Document {
			_type: "employee";

			/**
			 * Full name - `String`
			 */
			title: string;

			/**
			 * Email - `String`
			 */
			email?: string;
		}

		/**
		 * Page
		 */
		interface Page extends Sanity.Document {
			_type: "page";

			/**
			 * Slug - `Slug`
The slug (URL) that is used to identify the page
			 */
			slug: {
				_type: "slug";
				current: string;
			};

			/**
			 * Content - `RegistryReference`
The Content Blocks of the page.
			 */
			content: ContentBlock;

			/**
			 * SEO - `RegistryReference`
These values populate meta tags
			 */
			seo: Seo;

			/**
			 * Options - `Object`
Configuration for the page
			 */
			options?: {
				/**
			 * Release date - `RegistryReference`
The date the page was released
			 */
				releaseDate?: DateObject;

				/**
				 * Lock Page - `RegistryReference`
				 */
				locked_slug?: LockedSlugObject;

				/**
			 * Exclude from search - `Boolean`
Set this to true, if you don't want this page to be part of the search results
			 */
				excludeFromSearch?: boolean;
			};
		}

		/**
		 * News
		 */
		interface News extends Sanity.Document {
			_type: "news";

			/**
			 * Image - `RegistryReference`
The image of the news article that will be used when referencing to the news article.
			 */
			media: Media;

			/**
			 * Slug - `Slug`
The slug (URL) that is used to identify the page
			 */
			slug: {
				_type: "slug";
				current: string;
			};

			/**
			 * Content - `RegistryReference`
The Content Blocks of the page.
			 */
			content: ContentBlock;

			/**
			 * SEO - `RegistryReference`
These values populate meta tags
			 */
			seo: Seo;

			/**
			 * Options - `Object`
Configuration for the page
			 */
			options?: {
				/**
			 * Release date - `RegistryReference`
The date the page was released
			 */
				releaseDate?: DateObject;

				/**
				 * Lock Page - `RegistryReference`
				 */
				locked_slug?: LockedSlugObject;

				/**
			 * Exclude from search - `Boolean`
Set this to true, if you don't want this page to be part of the search results
			 */
				excludeFromSearch?: boolean;
			};
		}

		/**
			 * Header
Configuration for the header located at the top of the site
			 */
		interface HeaderDocument extends Sanity.Document {
			_type: "headerDocument";

			/**
			 * Menu - `Array`
			 */
			menu?: Array<
				| Sanity.Keyed<Link>
				| Sanity.Keyed<{
						_type: "level";

						/**
						 * Title - `String`
						 */
						title?: string;

						/**
						 * Items - `Array`
						 */
						items?: Array<
							| Sanity.Keyed<Link>
							| Sanity.Keyed<{
									_type: "level";

									/**
									 * Title - `String`
									 */
									title?: string;

									/**
									 * Items - `Array`
									 */
									items?: Array<Sanity.Keyed<Link>>;
								}>
						>;
					}>
			>;

			/**
			 * CTA - `RegistryReference`
			 */
			cta?: Link;
		}

		/**
			 * Footer
Configuration for the footer located at the bottom of the site
			 */
		interface FooterDocument extends Sanity.Document {
			_type: "footerDocument";

			/**
			 * Use the header menu as menu - `Boolean`
If enabled, the header menu will also be used as the footer menu
			 */
			useHeaderMenu?: boolean;

			/**
			 * Menu - `Array`
			 */
			menu?: Array<
				| Sanity.Keyed<Link>
				| Sanity.Keyed<{
						_type: "level";

						/**
						 * Title - `String`
						 */
						title?: string;

						/**
						 * Items - `Array`
						 */
						items?: Array<
							| Sanity.Keyed<Link>
							| Sanity.Keyed<{
									_type: "level";

									/**
									 * Title - `String`
									 */
									title?: string;

									/**
									 * Items - `Array`
									 */
									items?: Array<Sanity.Keyed<Link>>;
								}>
						>;
					}>
			>;

			/**
			 * Bottom - `Object`
			 */
			bottom?: {
				/**
				 * Menu - `Array`
				 */
				menu?: Array<Sanity.Keyed<Link>>;

				/**
				 * Copyright - `RegistryReference`
				 */
				copyright?: SimpleText;
			};
		}

		/**
			 * Logo
Configuration for the Logo globally for the site
			 */
		interface LogoWithColorScheme extends Sanity.Document {
			_type: "logoWithColorScheme";

			/**
			 * Logo - `Image`
			 */
			logo?: {
				asset: Sanity.Asset;
				crop?: Sanity.ImageCrop;
				hotspot?: Sanity.ImageHotspot;
			};

			/**
			 * Color Scheme - `Object`
Logos for the different color schemes. Useful if you want to use a different logo for each color scheme.
			 */
			color_scheme?: {
				/**
				 * On "Light" background - `Image`
				 */
				light?: {
					asset: Sanity.Asset;
					crop?: Sanity.ImageCrop;
					hotspot?: Sanity.ImageHotspot;
				};

				/**
				 * On "Dark" background - `Image`
				 */
				dark?: {
					asset: Sanity.Asset;
					crop?: Sanity.ImageCrop;
					hotspot?: Sanity.ImageHotspot;
				};
			};
		}

		type ReferencePageObject = {
			_type: "referencePageObject";

			/**
			 * Reference - `Reference`
			 */
			reference: Sanity.Reference<Page | News>;

			/**
			 * Overwrite fields - `Object`
If you want to overwrite the referenced page/news etc. fields
			 */
			overwrite?: {
				/**
				 * Title - `String`
				 */
				title?: string;

				/**
				 * Subtitle - `RegistryReference`
				 */
				subtitle?: SimpleText;
			};
		};

		type VimeoObject = {
			_type: "vimeoObject";

			/**
			 * Asset - `Object`
			 */
			asset?: {
				/**
			 * Playback Source (HLS) - `String`
The "HLS" Distribution source. (1) Go to https://vimeo.com/manage/videos (2) Press the 3 dots (More actions) (3) Press Analytics (4) Go the left Distribution tab (5) Press "Copy link" next to "HLS (m3u8)" (6) Paste it here
			 */
				playbackSrc: string;

				/**
			 * Fallback Playback Source (older devices) - `String`
The "HD 720p" Distribution source. (1) Go to https://vimeo.com/manage/videos (2) Press the 3 dots (More actions) (3) Press Analytics (4) Go the left Distribution tab (5) Press "Copy link" next to "HD 720p (mp4, 1280x720)" (6) Paste it here
			 */
				fallbackPlaybackSrc?: string;
			};
		};

		type BackgroundColorObject = {
			_type: "backgroundColorObject";

			/**
			 * Color - `String`
			 */
			color?:
				| "none"
				| "primary"
				| "secondary"
				| "tertiary"
				| "level-1"
				| "level-2";
		};

		type AddressObject = {
			_type: "addressObject";

			/**
			 * Street - `String`
			 */
			street: string;

			/**
			 * Zip - `String`
			 */
			zipCode: string;

			/**
			 * City - `String`
			 */
			city: string;

			/**
			 * Country - `String`
			 */
			country:
				| "AF"
				| "AX"
				| "AL"
				| "DZ"
				| "AS"
				| "AD"
				| "AO"
				| "AI"
				| "AQ"
				| "AG"
				| "AR"
				| "AM"
				| "AW"
				| "AU"
				| "AT"
				| "AZ"
				| "BS"
				| "BH"
				| "BD"
				| "BB"
				| "BY"
				| "BE"
				| "BZ"
				| "BJ"
				| "BM"
				| "BT"
				| "BO"
				| "BA"
				| "BW"
				| "BV"
				| "BR"
				| "IO"
				| "BN"
				| "BG"
				| "BF"
				| "BI"
				| "KH"
				| "CM"
				| "CA"
				| "CV"
				| "KY"
				| "CF"
				| "TD"
				| "CL"
				| "CN"
				| "CX"
				| "CC"
				| "CO"
				| "KM"
				| "CG"
				| "CD"
				| "CK"
				| "CR"
				| "CI"
				| "HR"
				| "CU"
				| "CY"
				| "CZ"
				| "DK"
				| "DJ"
				| "DM"
				| "DO"
				| "EC"
				| "EG"
				| "SV"
				| "GQ"
				| "ER"
				| "EE"
				| "ET"
				| "FK"
				| "FO"
				| "FJ"
				| "FI"
				| "FR"
				| "GF"
				| "PF"
				| "TF"
				| "GA"
				| "GM"
				| "GE"
				| "DE"
				| "GH"
				| "GI"
				| "GR"
				| "GL"
				| "GD"
				| "GP"
				| "GU"
				| "GT"
				| "GG"
				| "GN"
				| "GW"
				| "GY"
				| "HT"
				| "HM"
				| "VA"
				| "HN"
				| "HK"
				| "HU"
				| "IS"
				| "IN"
				| "ID"
				| "IR"
				| "IQ"
				| "IE"
				| "IM"
				| "IL"
				| "IT"
				| "JM"
				| "JP"
				| "JE"
				| "JO"
				| "KZ"
				| "KE"
				| "KI"
				| "KP"
				| "KR"
				| "KW"
				| "KG"
				| "LA"
				| "LV"
				| "LB"
				| "LS"
				| "LR"
				| "LY"
				| "LI"
				| "LT"
				| "LU"
				| "MO"
				| "MK"
				| "MG"
				| "MW"
				| "MY"
				| "MV"
				| "ML"
				| "MT"
				| "MH"
				| "MQ"
				| "MR"
				| "MU"
				| "YT"
				| "MX"
				| "FM"
				| "MD"
				| "MC"
				| "MN"
				| "MS"
				| "MA"
				| "MZ"
				| "MM"
				| "NA"
				| "NR"
				| "NP"
				| "NL"
				| "AN"
				| "NC"
				| "NZ"
				| "NI"
				| "NE"
				| "NG"
				| "NU"
				| "NF"
				| "MP"
				| "NO"
				| "OM"
				| "PK"
				| "PW"
				| "PS"
				| "PA"
				| "PG"
				| "PY"
				| "PE"
				| "PH"
				| "PN"
				| "PL"
				| "PT"
				| "PR"
				| "QA"
				| "RE"
				| "RO"
				| "RU"
				| "RW"
				| "SH"
				| "KN"
				| "LC"
				| "PM"
				| "VC"
				| "WS"
				| "SM"
				| "ST"
				| "SA"
				| "SN"
				| "CS"
				| "SC"
				| "SL"
				| "SG"
				| "SK"
				| "SI"
				| "SB"
				| "SO"
				| "ZA"
				| "GS"
				| "ES"
				| "LK"
				| "SD"
				| "SR"
				| "SJ"
				| "SZ"
				| "SE"
				| "CH"
				| "SY"
				| "TW"
				| "TJ"
				| "TZ"
				| "TH"
				| "TL"
				| "TG"
				| "TK"
				| "TO"
				| "TT"
				| "TN"
				| "TR"
				| "TM"
				| "TC"
				| "TV"
				| "UG"
				| "UA"
				| "AE"
				| "GB"
				| "US"
				| "UM"
				| "UY"
				| "UZ"
				| "VU"
				| "VE"
				| "VN"
				| "VG"
				| "VI"
				| "WF"
				| "EH"
				| "YE"
				| "ZM"
				| "ZW";
		};

		type ButtonObject = {
			_type: "buttonObject";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Alignment - `String`
				 */
				alignment?: "left" | "center" | "right";

				/**
				 * Variant - `String`
				 */
				variant?: "fill" | "stroke";

				/**
				 * Size - `String`
				 */
				size?: "xsmall" | "small" | "large";
			};

			/**
			 * Link - `RegistryReference`
			 */
			link?: Link;
		};

		type ContentBlock = Array<
			| Sanity.Keyed<RichTextBlock>
			| Sanity.Keyed<HeroBlock>
			| Sanity.Keyed<ColumnsBlock>
			| Sanity.Keyed<BreakerBlock>
			| Sanity.Keyed<AccordionBlock>
			| Sanity.Keyed<TableBlock>
			| Sanity.Keyed<ListBlock>
			| Sanity.Keyed<FormsBlock>
			| Sanity.Keyed<CustomBlock>
		>;

		type DateObject = string;

		type FilesObject = Array<
			Sanity.Keyed<{
				_type: "item";

				/**
				 * Name - `String`
				 */
				name: string;

				/**
				 * File - `File`
				 */
				file: {
					asset: Sanity.Asset;
				};
			}>
		>;

		type LockedSlugObject = boolean;

		type InlineLink = {
			_type: "inlineLink";

			/**
			 * Type - `String`
			 */
			type?: "internal" | "external" | "file" | "mailto";

			/**
			 * Internal Link - `RegistryReference`
			 */
			internalLink?: InternalLink;

			/**
			 * Anchor Point - `String`
Add an anchor point to the link
			 */
			anchor?: string;

			/**
			 * External Link - `Url`
			 */
			externalLink?: string;

			/**
			 * Mail to - `Reference`
			 */
			mailto?: Sanity.Reference<Employee>;

			/**
			 * File - `File`
			 */
			file?: {
				asset: Sanity.Asset;
			};
		};

		type InternalLink = Sanity.Reference<Page | News>;

		type Link = {
			_type: "link";

			/**
			 * Title - `String`
			 */
			title?: string;

			/**
			 * Type - `String`
			 */
			type?: "internal" | "external" | "file" | "mailto";

			/**
			 * Internal Link - `RegistryReference`
			 */
			internalLink?: InternalLink;

			/**
			 * Anchor Point - `String`
Add an anchor point to the link
			 */
			anchor?: string;

			/**
			 * External Link - `Url`
			 */
			externalLink?: string;

			/**
			 * Mail to - `Reference`
			 */
			mailto?: Sanity.Reference<Employee>;

			/**
			 * File - `File`
			 */
			file?: {
				asset: Sanity.Asset;
			};
		};

		type Media = {
			_type: "media";

			/**
			 * Type - `String`
			 */
			type?: "undefined" | "image" | "video";

			/**
			 * Image - `Image`
			 */
			image?: {
				asset: Sanity.Asset;
				crop?: Sanity.ImageCrop;
				hotspot?: Sanity.ImageHotspot;

				/**
			 * Alternative Text - `String`
A short description of the image, which provides context of what image is showing
			 */
				alt?: string;

				/**
			 * Attribution - `String`
Overrides default Attribution from media library
			 */
				attribution?: string;
			};

			/**
			 * Video - `RegistryReference`
			 */
			video?: VimeoObject;

			/**
			 * Video Settings - `Object`
			 */
			settings?: {
				/**
				 * Show Controls - `Boolean`
				 */
				controls?: boolean;

				/**
				 * Muted - `Boolean`
				 */
				muted?: boolean;

				/**
			 * Autoplay - `Boolean`
Video cannot autoplay, if not muted.
			 */
				autoPlay?: boolean;

				/**
				 * Loop - `Boolean`
				 */
				loop?: boolean;
			};
		};

		type RichText = Array<
			| Sanity.Keyed<Sanity.Block>
			| Sanity.Keyed<ButtonObject>
			| Sanity.Keyed<{
					asset: Sanity.Asset;
					crop?: Sanity.ImageCrop;
					hotspot?: Sanity.ImageHotspot;

					/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
					blockOptions?: {
						/**
						 * Wider Than Text - `Boolean`
						 */
						widerThanText?: boolean;

						/**
						 * Alignment - `String`
						 */
						alignment?: "left" | "center" | "right";
					};

					/**
					 * Alternative Text - `Text`
					 */
					alt?: string;
				}>
		>;

		type Seo = {
			_type: "seo";

			/**
			 * Title - `String`
The title that will be used on google search results, and when sharing a link to the page
			 */
			metaTitle?: string;

			/**
			 * Keywords - `String`
Which keywords are important on this page? They should be seeprated, with, commas
			 */
			keywords?: string;

			/**
			 * Synonyms - `String`
Similar words tro inform the SEO Review
			 */
			synonyms?: string;

			/**
			 * Page Type - `String`
"website", or "article"
			 */
			pageType?: string;

			/**
			 * Description - `Text`
The description that will be used on google search results, and when sharing a link to the page
			 */
			metaDescription?: string;

			/**
			 * Image - `Image`
The image that will be used when sharing a link to the page. Recommended width: 1200px height: 630px (will be auto resized)
			 */
			image?: {
				asset: Sanity.Asset;
				crop?: Sanity.ImageCrop;
				hotspot?: Sanity.ImageHotspot;
			};
		};

		type SimpleText = Array<Sanity.Keyed<Sanity.Block>>;

		type CustomBlock = {
			_type: "customBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Background Color - `RegistryReference`
				 */
				backgroundColor?: BackgroundColorObject;
			};

			/**
			 * Type - `String`
This is custom blocks. Only use this if you know what you are doing.
			 */
			type: "cookie_policy" | "mf-stock_chart";
		};

		type AccordionBlock = {
			_type: "accordionBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Multiple items open simultaneously - `Boolean`
				 */
				multiple?: boolean;

				/**
				 * Background Color - `RegistryReference`
				 */
				backgroundColor?: BackgroundColorObject;
			};

			/**
			 * Title - `String`
			 */
			title: string;

			/**
			 * Subtitle - `RegistryReference`
			 */
			subtitle?: SimpleText;

			/**
			 * Items - `Array`
			 */
			items?: Array<
				Sanity.Keyed<{
					_type: "item";

					/**
					 * Title - `String`
					 */
					title: string;

					/**
					 * Content - `RegistryReference`
					 */
					content: RichText;

					/**
					 * Is default open? - `Boolean`
					 */
					defaultOpen?: boolean;
				}>
			>;
		};

		type BreakerBlock = {
			_type: "breakerBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Variants - `String`
				 */
				variants?:
					| "text-left"
					| "wide-text-left"
					| "text-right"
					| "wide-text-right";

				/**
				 * Background Color - `RegistryReference`
				 */
				backgroundColor?: BackgroundColorObject;
			};

			/**
			 * Title - `String`
			 */
			title?: string;

			/**
			 * Content - `RegistryReference`
			 */
			content?: SimpleText;

			/**
			 * CTA - `RegistryReference`
Call to action button
			 */
			cta?: Link;

			/**
			 * Background Media - `RegistryReference`
			 */
			backgroundImage: Media;

			/**
			 * Foreground Media - `RegistryReference`
			 */
			foregroundImage?: Media;
		};

		type ColumnsBlock = {
			_type: "columnsBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Background Color - `RegistryReference`
				 */
				backgroundColor?: BackgroundColorObject;

				/**
				 * Image Size - `String`
				 */
				imageSize?: "small" | "medium" | "large" | "xlarge";

				/**
				 * Rounded image - `Boolean`
				 */
				imageRounded?: boolean;
			};

			/**
			 * Title - `String`
			 */
			title?: string;

			/**
			 * Subtitle - `RegistryReference`
			 */
			subtitle?: SimpleText;

			/**
			 * CTA - `RegistryReference`
Optional
			 */
			cta?: Link;

			/**
			 * Content - `Array`
			 */
			content?: Array<
				Sanity.Keyed<{
					_type: "column";

					/**
					 * Image - `RegistryReference`
					 */
					image?: Media;

					/**
					 * Title - `String`
					 */
					title?: string;

					/**
					 * Subtitle - `RegistryReference`
					 */
					subtitle?: SimpleText;

					/**
					 * CTA - `RegistryReference`
					 */
					cta?: Link;
				}>
			>;
		};

		type FormsBlock = {
			_type: "formsBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Background Color - `RegistryReference`
				 */
				backgroundColor?: BackgroundColorObject;

				/**
			 * Reversed - `Boolean`
Set this to "true" if you want the form to be in the left side instead
			 */
				reversed?: boolean;
			};

			/**
			 * Form Options - `Object`
Configuration options for the form
			 */
			options?: {
				/**
				 * Type - `String`
				 */
				type: "demo" | "newsletter" | "contact";

				/**
				 * Submit text - `String`
				 */
				submitText: string;

				/**
				 * Description - `RegistryReference`
				 */
				description?: SimpleText;
			};

			/**
			 * Title - `String`
			 */
			title: string;

			/**
			 * Content - `RegistryReference`
			 */
			content?: SimpleText;
		};

		type HeroBlock = {
			_type: "heroBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Title Color - `String`
				 */
				titleColor?: "white" | "blue";
			};

			/**
			 * Title - `String`
			 */
			title: string;

			/**
			 * Content - `RegistryReference`
			 */
			content?: SimpleText;

			/**
			 * CTA - `RegistryReference`
Call to action button
			 */
			cta?: Link;

			/**
			 * Background Media - `RegistryReference`
			 */
			backgroundImage: Media;

			/**
			 * Foreground Media - `RegistryReference`
			 */
			foregroundImage?: Media;
		};

		type ListBlock = {
			_type: "listBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Background Color - `RegistryReference`
				 */
				backgroundColor?: BackgroundColorObject;

				/**
				 * Limit - `Number`
				 */
				limit?: number;

				/**
			 * Fallback text - `String`
This is the text that will be displayed if the list is empty
			 */
				fallbackText?: string;
			};

			/**
			 * Type - `String`
			 */
			type: "news" | "page";

			/**
			 * Title - `String`
			 */
			title?: string;

			/**
			 * CTA - `RegistryReference`
Optional
			 */
			cta?: Link;

			/**
			 * Press Options - `Object`
			 */
			pressOptions?: {
				/**
			 * Show Filter - `Boolean`
Whether the list should include radio buttons for filtering
			 */
				showFilter?: boolean;
			};

			/**
			 * Pages - `Array`
			 */
			pages?: Array<Sanity.Keyed<ReferencePageObject>>;
		};

		type Logo = {
			_type: "logo";

			/**
			 * Media - `RegistryReference`
			 */
			media?: Media;

			/**
			 * Link - `RegistryReference`
			 */
			link?: Link;
		};

		type RichTextBlock = {
			_type: "richTextBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Background Color - `RegistryReference`
				 */
				backgroundColor?: BackgroundColorObject;

				/**
			 * Container width - `String`
The width of the container
			 */
				innerWidth?: "small" | "medium" | "large" | "full";
			};

			/**
			 * Title - `String`
This also generates a divider between the title and rich text
			 */
			title?: string;

			/**
			 * Richtext - `RegistryReference`
			 */
			richtext?: RichText;
		};

		type SimpleTextBlock = {
			_type: "simpleTextBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
				 * Background Color - `RegistryReference`
				 */
				backgroundColor?: BackgroundColorObject;
			};

			/**
			 * Simpletext - `RegistryReference`
			 */
			simpletext?: SimpleText;
		};

		type TableBlock = {
			_type: "tableBlock";

			/**
			 * Block Options - `Object`
Visual or logical configuration for the block
			 */
			blockOptions?: {
				/**
			 * Use the first row as header - `Boolean`
Set this to active to use the first row as header
			 */
				firstRowAsHeader?: boolean;

				/**
				 * Background Color - `RegistryReference`
				 */
				backgroundColor?: BackgroundColorObject;
			};

			/**
			 * Title - `String`
			 */
			title?: string;

			/**
			 * Subtitle - `RegistryReference`
			 */
			subtitle?: SimpleText;

			/**
			 * Table - `RegistryReference`
			 */
			table?: Table;
		};

		type Document =
			| SiteInformationDocument
			| CompanyInformationDocument
			| CatchAllSlugsDocument
			| Tracking
			| GlobalSeoDocument
			| Employee
			| Page
			| News
			| HeaderDocument
			| FooterDocument
			| LogoWithColorScheme;
	}
}
