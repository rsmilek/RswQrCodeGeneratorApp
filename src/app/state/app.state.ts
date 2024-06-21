/** App store definition */
export interface AppState {
    
    /** True if UI is in dark mode otherwise False */
    isDarkMode: boolean;
    
    /** True if QR code generation process by API is active otherwise False */
    generatingQrCodeBlob: boolean;
    
    /** Error message taken from failed QR code generation process by API */
    generatingQrCodeError: string;
    
    /** QR code image binary data */
    qrCodeBlob: Blob;
    
    /** True if QR code image binary data valid and available for download */
    qrCodeBlobEnabled: boolean;
    
    /** QR code image URL data to be used HTML rendering */
    qrCodeData: string;
    
    /** True if QR code image downloading process is active otherwise False */
    downloadingQrCodeBlob: boolean;
}