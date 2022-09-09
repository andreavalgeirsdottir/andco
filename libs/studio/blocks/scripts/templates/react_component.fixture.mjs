export const template = `import { <%= blockNameTypePascal; %>Props } from './<%= blockNameTypeSnake; %>';

export const <%= blockNameTypeCamel; %>Fixture: <%= blockNameTypePascal; %>Props['block'] = { _type: '<%= blockNameTypeCamel; %>', title: '<%= blockNameTypeCamel; %>' };
`;
