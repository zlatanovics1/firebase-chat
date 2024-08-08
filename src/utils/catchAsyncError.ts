export function catchAsyncError(fn: (...args: any[]) => Promise<any>) {
  return (...args: any[]) => {
    return fn(...args).catch((err: Error) => {
      console.log(err);
    });
  };
}
