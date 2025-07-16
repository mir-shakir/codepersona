declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export {} // This ensures the file is treated as a module
