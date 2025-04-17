import { NodePlopAPI } from "plop";
import fs from "node:fs";
import path from "node:path";
import { generatePackageJson } from "src/templates/generatePackageJson";
import { LibraryType } from "src/types/libraryType";
import { PackageType } from "src/types/packageType";
import { formatByPrettier } from "src/utils/foramtByPrettier";

export const HELPER_NAMES = {
  UPPER_CASE: "upperCase",
  LOWER_CASE: "lowerCase",
};

export const ACTION_NAMES = {
  MKDIR: "mkdir",
  PACKAGE_SCAFFOLD: "package-scaffold",
};

export const setHelpers = (plop: NodePlopAPI) => {
  plop.setHelper(HELPER_NAMES.UPPER_CASE, (txt: string) => txt.toUpperCase());
  plop.setHelper(HELPER_NAMES.LOWER_CASE, (txt: string) => txt.toLowerCase());

  plop.setActionType(ACTION_NAMES.MKDIR, (answers, config, plop) => {
    const data = config?.data as { path: string };
    console.log(`hello data`, data);
    const targetPath = path.resolve(
      process.cwd(),
      plop.renderString(data?.path, answers)
    );
    try {
      fs.mkdirSync(targetPath, { recursive: true });
      return `디렉토리 생성됨: ${targetPath}`;
    } catch (err: any) {
      return `디렉토리 생성 실패 (${targetPath}): ${err.message}`;
    }
  });

  plop.setActionType(
    ACTION_NAMES.PACKAGE_SCAFFOLD,
    async (answers, config, plop) => {
      const data = config?.data as {
        path: string;
        packageType: PackageType;
        libraryType: LibraryType;
      };
      console.log(`hello data`, data);

      const targetPath = path.resolve(
        process.cwd(),
        plop.renderString(data?.path, answers)
      );

      const name = data.path.split("/").pop() ?? "default";

      const packageJson = await formatByPrettier(
        generatePackageJson({
          name,
          packageType: data.packageType,
          libraryType: data.libraryType,
        }),
        {
          parser: "json",
        }
      );

      fs.mkdirSync(targetPath, { recursive: true });
      fs.mkdirSync(`${targetPath}/src`);
      fs.writeFileSync(`${targetPath}/src/index.ts`, "");
      fs.writeFileSync(path.resolve(targetPath, "package.json"), packageJson);
      fs.writeFileSync(
        path.resolve(targetPath, "tsconfig.json"),
        await formatByPrettier(
          `
  {
    "extends": "@repo/typescript-config/${data.libraryType === "common" ? "base" : "nextjs"}.json",
    "compilerOptions": {
      "baseUrl": "."
  },
  "include": ["./src/**/*.ts", "./src/**/*.tsx"],
  "exclude": ["node_modules", "esm", "dist"]
}

`,
          {
            parser: "json",
          }
        )
      );
      return "👍 패키지 생성됨";
    }
  );
};
