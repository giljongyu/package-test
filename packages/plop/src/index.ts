import { NodePlopAPI } from "plop";
import { setHelpers } from "./helpers";
import { createPackagesDirectory } from "./commands/createPackagesDirectory";

export const definePlopGenerator = () => {
  return (plop: NodePlopAPI) => {
    setHelpers(plop);
    createPackagesDirectory("gen-package", plop);
  };
};
