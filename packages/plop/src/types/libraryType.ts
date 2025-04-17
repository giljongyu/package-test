export const LIBRARY_TYPES = {
  REACT: "react",
  COMMON: "common",
} as const;

export type LibraryType = (typeof LIBRARY_TYPES)[keyof typeof LIBRARY_TYPES];
