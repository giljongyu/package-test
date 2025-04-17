import * as fs from "node:fs";

/**
 * 주어진 디렉토리가 존재하지 않으면 재귀적으로 생성합니다.
 */
export function createDirectoryIfNotExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`폴더 생성됨: ${dirPath}`);
  } else {
    console.log(`폴더가 이미 존재함: ${dirPath}`);
  }
}
