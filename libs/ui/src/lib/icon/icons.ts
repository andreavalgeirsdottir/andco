/* eslint-disable @typescript-eslint/no-var-requires */

export const icons = {
  'arrow-down': require('./assets/arrow-down.svg').ReactComponent,
  'arrow-left': require('./assets/arrow-left.svg').ReactComponent,
  'arrow-right': require('./assets/arrow-right.svg').ReactComponent,
  'arrow-short-down': require('./assets/arrow-short-down.svg').ReactComponent,
  'arrow-short-left': require('./assets/arrow-short-left.svg').ReactComponent,
  'arrow-short-right': require('./assets/arrow-short-right.svg').ReactComponent,
  'arrow-short-up': require('./assets/arrow-short-up.svg').ReactComponent,
  'arrow-up': require('./assets/arrow-up.svg').ReactComponent,
  'burgermenu': require('./assets/burgermenu.svg').ReactComponent,
  'checkmark': require('./assets/checkmark.svg').ReactComponent,
  'chevron-down': require('./assets/chevron-down.svg').ReactComponent,
  'chevron-left': require('./assets/chevron-left.svg').ReactComponent,
  'chevron-right': require('./assets/chevron-right.svg').ReactComponent,
  'chevron-up': require('./assets/chevron-up.svg').ReactComponent,
  'clean': require('./assets/clean.svg').ReactComponent,
  'close': require('./assets/close.svg').ReactComponent,
  'edit': require('./assets/edit.svg').ReactComponent,
  'exit': require('./assets/exit.svg').ReactComponent,
  'external': require('./assets/external.svg').ReactComponent,
  'menu': require('./assets/menu.svg').ReactComponent,
  'minus': require('./assets/minus.svg').ReactComponent,
  'more-vertical-alt': require('./assets/more-vertical-alt.svg').ReactComponent,
  'plus': require('./assets/plus.svg').ReactComponent,
  'search': require('./assets/search.svg').ReactComponent,
  'software-download': require('./assets/software-download.svg').ReactComponent,
  'software-upload': require('./assets/software-upload.svg').ReactComponent,
  'spinner': require('./assets/spinner.svg').ReactComponent,
};

export type Icons = keyof typeof icons;

export const iconsKey = Object.keys(icons) as Icons[];
