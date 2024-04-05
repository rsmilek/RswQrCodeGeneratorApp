export interface AppState {
    isDarkMode: boolean;
    generatingQrCodeBlob: boolean;
    generatingQrCodeError: string;
    // qrCodeBlob: Blob;
    // qrCodeBlob: Blob | undefined;
    qrCodeBlob?: Blob;
    qrCodeData: string;
    downloadingQrCodeBlob: boolean;
}