export interface FilePreview {
  position: number;
  url: string;
  file: File | null;
}

export interface FilePreviewOnlyUrl {
  position: number;
  url: string;
}