import { NodePath, NodeProcess } from "./node-helper";

let projectRootPath: string = NodeProcess.cwd();

export function setProjectRootPath(dirPath: string) {
  projectRootPath = dirPath;
}

export function getPathUnderProjectRoot(...pathParts: string[]): string {
  return NodePath.join(projectRootPath, ...pathParts);
}

export function toPosixPath(fullPath: string): string {
  return fullPath.replace(/\\{1,2}/g, "/");
}
