/**
 * tsup의 설정 옵션입니다.
 * @type {import('tsup').Options}
 * @example
 * ```js
 * import { options } from '@repo/tsup-config';
 * ```
 */
const defaultConfig = {
  entry: ['**/index.ts'],
  splitting: false,
  clean: true,
  dts: true,
};

export default [
  {
    ...defaultConfig,
    format: 'cjs',
    outDir: 'dist',
  },
  {
    ...defaultConfig,
    format: 'esm',
    outDir: 'esm',
  },
]
