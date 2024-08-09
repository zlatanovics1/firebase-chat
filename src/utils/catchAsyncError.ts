export function catchAsyncError<T>(fn: (...args: any[]) => Promise<T>) {
  return (...args: any[]) => {
    return fn(...args).catch((err: Error) => {
      console.log(err);
    });
  };
}
