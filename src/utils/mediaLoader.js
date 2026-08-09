/**
 * Preloads a file using fetch with byte-level progress tracking.
 * Returns a Blob URL that can be used in <img>, <video>, or as GLB source.
 */
export function preloadWithProgress(url, onBytesProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      // If we can't read the content length, fall back to just awaiting the blob
      if (!total) {
        const blob = await response.blob();
        if (onBytesProgress) onBytesProgress(blob.size, blob.size);
        resolve({ url: URL.createObjectURL(blob), originalUrl: url, size: blob.size });
        return;
      }

      const reader = response.body.getReader();
      const chunks = [];
      let loaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        if (onBytesProgress) onBytesProgress(loaded, total);
      }

      const blob = new Blob(chunks);
      resolve({ url: URL.createObjectURL(blob), originalUrl: url, size: total });
    } catch (err) {
      console.warn(`Failed to preload ${url}:`, err);
      resolve({ url, originalUrl: url, size: 0, error: true });
    }
  });
}

/**
 * Preload multiple files in parallel with combined progress tracking.
 * Progress is accurate at byte level across all files.
 * @param {Array<{url: string, weight?: number}>} files
 * @param {Function} onProgress - called with (percent, loadedBytes, totalBytes)
 */
export async function preloadMedia(files, onProgress) {
  // First pass: get file sizes via HEAD requests for accurate total
  const sizes = await Promise.all(
    files.map(async (file) => {
      try {
        const res = await fetch(file.url, { method: 'HEAD' });
        const size = parseInt(res.headers.get('content-length') || '0', 10);
        return size || file.weight || 1000000; // fallback: 1MB estimate
      } catch {
        return file.weight || 1000000;
      }
    })
  );

  const totalBytes = sizes.reduce((sum, s) => sum + s, 0);
  const loadedPerFile = new Array(files.length).fill(0);

  const promises = files.map((file, i) =>
    preloadWithProgress(file.url, (loaded, total) => {
      loadedPerFile[i] = loaded;
      const totalLoaded = loadedPerFile.reduce((sum, l) => sum + l, 0);
      const percent = Math.min(100, Math.round((totalLoaded / totalBytes) * 100));
      if (onProgress) onProgress(percent, totalLoaded, totalBytes);
    })
  );

  return Promise.all(promises);
}