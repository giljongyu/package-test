export const PACKAGE_TYPES = {
  JIT: "JIT",
  COMPILED: "COMPILED",
  PUBLISHABLE: "PUBLISHABLE",
} as const;

export type PackageType = (typeof PACKAGE_TYPES)[keyof typeof PACKAGE_TYPES];

