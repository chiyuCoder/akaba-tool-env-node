import { NodeFs, NodePath, NodeProcess } from "./node-helper";
let projectRootPath: string = "";

export function setProjectRootPath(dirPath: string) {
  projectRootPath = dirPath;
}

/**
 * @since 0.0.4
 */
export function setProjectRootPathWithCwd() {
  setProjectRootPath(NodeProcess.cwd());
}

/**
 * @description
 * -- when return empty string, it will not call "setProjectRootPath"
 * @since 0.0.4
 */
export function setProjectRootPathWithTargetFileName(
  currentPath: string, 
  fileName: string
): string {
  const targetPath = getParentPathUntilHas(currentPath, fileName);
  if (targetPath) {
    setProjectRootPath(targetPath);
  }
  return targetPath;
}

export function getPathUnderProjectRoot(...pathParts: string[]): string {
  if (projectRootPath) {
    return NodePath.join(projectRootPath, ...pathParts);
  }
  /**
   * @since 0.0.4
   */
  throw new Error("please call setProjectRootPath manually");
}

/**
 * @since 0.0.4
 */
export function getPosixPathUnderProjectRoot(...pathParts: string[]): string {
  const systemPath = getPathUnderProjectRoot(...pathParts);
  return toPosixPath(systemPath);
}

/**
 * @since 0.0.4
 */
export function joinPath(...pathParts: string[]): string {
  return toPosixPath(NodePath.join(...pathParts));
}

/**
 * @since 0.0.4
 */
export function resolvePath(...pathParts: string[]): string {
  return toPosixPath(NodePath.resolve(...pathParts));
}

/**
 * @since 0.0.4
 */
export function getDirPath(fullPath: string): string {
  return toPosixPath(NodePath.dirname(fullPath));
}

export function formatToPath(inputInfo: NodePath.FormatInputPathObject): string {
  return toPosixPath(NodePath.format(inputInfo));
}
/**
 * @since 0.0.4
 */
export function getRelativePath(from: string, to: string) {
  return toPosixPath(NodePath.relative(from, to));
}

/**
 * @since 0.0.4
 */
export function toPosixNormalPath(pathPart: string): string {
  return toPosixPath(NodePath.normalize(pathPart));
}

export function toPosixPath(fullPath: string): string {
  return fullPath.replace(/\\{1,2}/g, "/");
}

/**
 * @since 0.0.5
 * @param currentPath 
 * @param targetFileName 
 * @returns 
 */
export function getParentPathUntilHas(
  currentPath: string,
  targetFileName: string
): string {
  const targetFilePath = NodePath.join(currentPath, targetFileName);
  if (NodeFs.existsSync(targetFilePath)) {
    return currentPath;
  }
  const parentDirPath = NodePath.dirname(currentPath);
  if (getMayBeRootPath(parentDirPath)) {
    return "";
  }
  return getParentPathUntilHas(parentDirPath, targetFileName);
}

/**
 * @since 0.0.4
 * @param currentPath 
 * @param getIsMatch 
 * @returns 
 */
export function getParentPathUntilMatch(
  currentPath: string,
  getIsMatch: (inputPath: string) => boolean
): string {
  const isMatch = getIsMatch(currentPath);
  if (isMatch) {
    return currentPath;
  }
  const parentDirPath = NodePath.dirname(currentPath);
  if (getMayBeRootPath(parentDirPath)) {
    return "";
  }
  return getParentPathUntilMatch(currentPath, getIsMatch);
}

/**
 * @since 0.0.4
 * @param fullPath 
 * @returns 
 */
export function getMayBeRootPath(fullPath: string): boolean {
  const parentDirPath = NodePath.dirname(fullPath);
  return NodePath.normalize(parentDirPath) === NodePath.normalize(fullPath);
}
