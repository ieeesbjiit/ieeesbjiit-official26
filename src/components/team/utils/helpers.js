/**
 * Splits an array into chunks of the given size.
 * @param {Array} arr - The array to chunk.
 * @param {number} size - The size of each chunk.
 * @returns {Array[]} An array of chunked arrays.
 */
export function chunkArray(arr, size) {
  const rows = [];
  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size));
  }
  return rows;
}