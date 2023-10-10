/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
  electronAPI?: {
    copyToClipboard: (text: string) => void;
  };
}
