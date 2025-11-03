export interface FileData {
  name: string;
  content: string | ArrayBuffer;
  type: string;
  size: number;
  isText: boolean;
}

export async function loadFile(
  accept?: string,
  asBinary?: boolean
): Promise<FileData | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    if (accept) {
      input.accept = accept;
    }

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }

      const isText = file.type.startsWith('text/') || !asBinary;

      try {
        const content = await readFileContent(file, !isText);
        resolve({
          name: file.name,
          content,
          type: file.type,
          size: file.size,
          isText,
        });
      } catch (error) {
        console.error('Failed to read file:', error);
        resolve(null);
      }
    };

    input.click();
  });
}

export function readFileContent(
  file: File,
  asBinary: boolean = false
): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    if (asBinary) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  });
}

export function downloadFile(
  content: string | Blob,
  filename: string,
  mimeType: string = 'text/plain'
): void {
  const blob =
    content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function detectFileType(filename: string): 'text' | 'binary' {
  const textExtensions = [
    '.txt',
    '.json',
    '.xml',
    '.html',
    '.css',
    '.js',
    '.ts',
    '.jsx',
    '.tsx',
    '.md',
    '.yaml',
    '.yml',
    '.csv',
    '.log',
  ];
  const extension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return textExtensions.includes(extension) ? 'text' : 'binary';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
