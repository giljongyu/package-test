import prettier from "prettier";

const PRETTIER_CONFIG: Partial<prettier.RequiredOptions> = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: "es5",
  tabWidth: 2,
  arrowParens: "avoid",
  parser: "typescript",
};

export const formatByPrettier = (
  code: string,
  options?: Partial<prettier.RequiredOptions>
) => {
  return prettier.format(code, { ...PRETTIER_CONFIG, ...options });
};
