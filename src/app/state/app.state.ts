export interface AppState {
    isDarkMode: boolean;
    generatingQrCodeBlob: boolean;
    generatingQrCodeError: string;
    qrCodeBlob: Blob
    qrCodeData: string;
    downloadingQrCodeBlob: boolean;
}