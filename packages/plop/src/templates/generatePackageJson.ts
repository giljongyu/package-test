import { PackageType } from "../types/packageType";
import { LibraryType } from "../types/libraryType";

interface Options {
  name: string;
  libraryType: LibraryType;
  packageType: PackageType;
}

export const generatePackageJson = (options: Options) => {
  const { name, libraryType, packageType } = options;

  const packageDevDependencies =
    packageType === "COMPILED" || packageType === "PUBLISHABLE"
      ? {
          tsup: "^8.4.0",
        }
      : {};

  const reactDevDependencies =
    libraryType === "react"
      ? {
          react: "^19.0.0",
          "react-dom": "^19.0.0",
          "@types/react": "^19.0.0",
          "@types/react-dom": "^19.0.0",
        }
      : {};

  const peerDependencies =
    libraryType === "react"
      ? {
          react: "*",
          "react-dom": "*",
        }
      : {};

  const packageJson = {
    name: `@repo/${name}`,
    version: "0.0.1",
    type: "module",
    sideEffects: false,
    repository: {
      type: "git",
      url: "git+https://github.com/orgs/payhereinc/repositories",
    },
    license: "MIT",
    files: ["dist/**/*", "esm/**/*"],
    scripts: {
      clean: "rimraf ./dist ./esm ./coverage ./node_modules",
      "test:type": "tsc --noEmit",
      build: "tsup",
    },
    main: "./dist/index.cjs",
    types: "./dist/index.d.cts",
    module: "./esm/index.js",
    exports: {
      ".": {
        import: {
          types: "./esm/index.d.ts",
          default: "./esm/index.js",
        },
        require: {
          types: "./dist/index.d.cts",
          default: "./dist/index.cjs",
        },
      },
      "./package.json": "./package.json",
    },
    devDependencies: {
      prettier: "^3.5.3",
      rimraf: "^6.0.1",
      vitest: "^2.1.8",

      "@repo/typescript-config": "workspace:*",
      "@types/node": "catalog:",
      typescript: "catalog:",
      ...reactDevDependencies,
      ...packageDevDependencies,
    },
    peerDependencies: {
      ...peerDependencies,
    },
  };

  return JSON.stringify(packageJson, null, 2);
};
