export function catchAsyncError<T, K>(fn: (...args: K[]) => Promise<T>) {
  return (...args: K[]) => {
    return fn(...args).catch((err: Error) => {
      console.log(err);
    });
  };
}
