import { NodeFs } from "./node-helper";
import {
  getDataFromBase64String
} from "akaba-tool";

export async function mkdirIfNotExist(dirPath: string): Promise<string | undefined> {
  if (NodeFs.existsSync(dirPath)) {
    return dirPath;
  }
  return NodeFs.promises.mkdir(dirPath, {
    recursive: true,
  });
}

export async function readTextFile(
  filePath: string,
  encoding: BufferEncoding = "utf8"
) {
  return NodeFs.promises.readFile(filePath, encoding)
}

export async function writeTextFile(
  filePath: string,
  data: string,
  encoding: BufferEncoding = "utf8"
) {
  return NodeFs.promises.writeFile(filePath, data, encoding);
}

export interface WriteJsonOption {
  encoding: BufferEncoding,
  jsonReplace:  (this: any, key: string, value: any) => any,
  space: string | number,
}

export async function writeJson(
  filePath: string,
  data: any,
  writeJsonOption: Partial<WriteJsonOption> = {}
) {
  return NodeFs.promises.writeFile(filePath, JSON.stringify(
    data, 
    writeJsonOption.jsonReplace,
    writeJsonOption.space
  ), writeJsonOption.encoding || "utf8");
}

export async function writeJsonWithSpace2(  
  filePath: string,
  data: any,
  writeJsonOption: Partial<Omit<WriteJsonOption, "space">> = {}
) {
  return writeJson(filePath, data, {
    ...writeJsonOption,
    space: 2,
  });
}

export async function writeJsonWithSpace4(  
  filePath: string,
  data: any,
  writeJsonOption: Partial<Omit<WriteJsonOption, "space">> = {}
) {
  return writeJson(filePath, data, {
    ...writeJsonOption,
    space: 4,
  });
}

export interface ReadJsonOption<T> {
  encoding: BufferEncoding,
  whenException: T | null | undefined
}

export async function readJson<T = unknown>(
  filePath: string,
  optionRecord: Partial<ReadJsonOption<T>> = {}
): Promise<T | null | undefined> {
  const jsonContent = await readTextFile(filePath, optionRecord.encoding || "utf8");
  try {
    return JSON.parse(jsonContent) as T;
  } catch(_) {
    return optionRecord.whenException;
  }
}

/**
 * 
 * @param getTargetFilePath 
 *  -- 其参数 srcType,srcSuffix,additionInfo 是依据给定的base64内容生成的
 *  -- 其返回值应该是一个代表文件路径的string
 * @param base64String -- 可以是dataUrl，也可以只是base64的内容
 */
export function writeFileByBase64(
  base64String: string,
  getTargetFilePath: (
    srcType: string, 
    srcSuffix: string,
    additionInfo: string
  ) => string,
) {
  const base64Info = getDataFromBase64String(base64String);
  let dataString = base64String;
  let srcType = "";
  let srcSuffix = "";
  let additionInfo = "";
  if (base64Info.isMatch) {
    dataString = base64Info.dataData;
    srcType = base64Info.dataType;
    srcSuffix = base64Info.dataSuffix;
    additionInfo = base64Info.additionalInfo || "";
  }
  const filePath = getTargetFilePath(srcType, srcSuffix, additionInfo);
  const fileBuffer = Buffer.from(dataString, "base64");
  return NodeFs.promises.writeFile(filePath, fileBuffer, "binary");
}

export async function writeFileByBase64FromFile(
  dataUrlFilePath: string,
  getTargetFilePath: (
    srcType: string, 
    srcSuffix: string,
    additionInfo: string
  ) => string,
  dataUrlFileEncoding: BufferEncoding = "utf8"
) {
  const dataUrl = await readTextFile(dataUrlFilePath, dataUrlFileEncoding);
  return writeFileByBase64(dataUrl, getTargetFilePath);
}
