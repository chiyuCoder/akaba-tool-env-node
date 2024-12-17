import { NodeFs } from "./node-helper";

export async function mkdirIfNotExist(dirPath: string): Promise<string | undefined> {
  if (NodeFs.existsSync(dirPath)) {
    return dirPath;
  }
  return NodeFs.promises.mkdir(dirPath, {
    recursive: true,
  });
}
