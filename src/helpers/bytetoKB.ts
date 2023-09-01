export function convertToKb(sizeInBytes: number | undefined) {
  if (sizeInBytes !== undefined) {
    const sizeInKb = sizeInBytes / 1024;
      return Number(sizeInKb.toFixed(2));
  }
}