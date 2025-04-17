import type { NodePlopAPI } from "plop";
import { PACKAGE_TYPES } from "../types/packageType";
import { generatePackageJson } from "src/templates/generatePackageJson";
import { formatByPrettier } from "src/utils/foramtByPrettier";
import { LIBRARY_TYPES } from "src/types/libraryType";
import { ACTION_NAMES } from "src/helpers";

export const createPackagesDirectory = (
  generatorName: string,
  plop: NodePlopAPI
) => {
  plop.setGenerator(generatorName, {
    description: "모노레포 내부에서 새로운 패키지를 만들기 위한 대화형 CLI에요",
    prompts: [
      {
        type: "input",
        name: "path",
        message:
          "👀 패키지의 이름과 경로를 지정해주세요 \n마지막 경로가 패키지 이름이 됩니다.\n(ex hello , ./hello , ./packages/hello)",
      },
      {
        type: "list",
        name: "packageType",
        message: `패키지 타입을 선택해주세요 (${Object.values(
          PACKAGE_TYPES
        ).join(", ")})`,
        choices: Object.values(PACKAGE_TYPES),
      },
      {
        type: "list",
        name: "libraryType",
        message: `라이브러리 타입을 선택해주세요 (${Object.values(
          LIBRARY_TYPES
        ).join(", ")})`,
        choices: Object.values(LIBRARY_TYPES),
      },
    ],
    actions: (answers) => [
      {
        type: ACTION_NAMES.PACKAGE_SCAFFOLD,
        data: answers,
      },
    ],
  });
};
