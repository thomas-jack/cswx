export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

export async function readFromClipboard(): Promise<string | null> {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      return await navigator.clipboard.readText();
    }
    return null;
  } catch (error) {
    console.error('Failed to read from clipboard:', error);
    return null;
  }
}

export function detectPasteEvent(callback: (text: string) => void): () => void {
  const handlePaste = (event: ClipboardEvent) => {
    const text = event.clipboardData?.getData('text');
    if (text) {
      callback(text);
    }
  };

  document.addEventListener('paste', handlePaste);

  return () => {
    document.removeEventListener('paste', handlePaste);
  };
}
