import * as path from "node:path";

/**
 * 입력 경로를 받아 절대 경로(targetDir)를 반환합니다.
 * 인자가 없으면 현재 작업 디렉토리(process.cwd())를 반환.
 */
export function resolveTargetDirectory(inputPath?: string): string {
  return inputPath ? path.resolve(process.cwd(), inputPath) : process.cwd();
}
