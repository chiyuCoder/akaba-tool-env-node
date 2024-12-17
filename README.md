# akaba-tool-env-browser

## 安全随机数
```typescript
export declare function cryptoRandInt(min: number, max?: number): number;
export declare const winCrypto: Crypto;
export declare function cryptoRandom(): number;
```

## 文件/路径 相关
```typescript
export declare namespace NSImitateDownloader {
    interface IConstructorAnchorOption {
        anchor: HTMLAnchorElement;
    }
    interface IConstructorAnchorBuildOption {
        appendToBody: boolean;
        anchorAttrName: string;
        anchorAttrValue: string;
    }
    type TConstructorOption = IConstructorAnchorOption | Partial<IConstructorAnchorBuildOption>;
}
export declare class ImitateDownloader {
    readonly anchor: HTMLAnchorElement;
    constructor(anchor: HTMLAnchorElement);
    download(fileName: string, url: string): this;
    downloadFromBlob(fileName: string, blob: Blob): this;
    downloadFromBase64(fileName: string, base64Str: string): this;
    static buildDownloadAnchor(option: Partial<NSImitateDownloader.IConstructorAnchorBuildOption>): HTMLAnchorElement;
    static getDownloadAnchor(option: NSImitateDownloader.TConstructorOption): HTMLAnchorElement;
}
export declare namespace NSFileRelate {
    interface IParsedPathDict {
        root: string;
        dir: string;
        base: string;
        name: string;
        ext: string;
    }
    interface OutPutOfBase64ToUint8Arr {
        uint8Array: Uint8Array;
        mime: string;
    }
}
/**
 * @since 1.1.0
 * @param str
 * @returns
 */
export declare function base64ToUint8Arr(str: string): NSFileRelate.OutPutOfBase64ToUint8Arr | null;
export declare function base64ToBlob(str: string): Blob | null;
export declare function blobToTmpUrl(blob: Blob): string;
export declare function base64ToTmpUrl(base64Str: string): string;
export declare function parsePath(pathStr: string): NSFileRelate.IParsedPathDict | null;
export declare function doImitateDownload(url: string, option: NSImitateDownloader.TConstructorOption & {
    fileName: string;
}): ImitateDownloader;
export declare function getImitateDownloader(option: NSImitateDownloader.TConstructorOption): ImitateDownloader;
export declare function getDownloadAnchor(option: NSImitateDownloader.TConstructorOption): HTMLAnchorElement;

```
