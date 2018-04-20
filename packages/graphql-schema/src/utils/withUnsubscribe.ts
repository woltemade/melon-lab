function withUnsubscribe<T>(
  iterator: AsyncIterator<T>,
  unsubscribe,
): AsyncIterator<T> {
  return {
    ...iterator,
    return: value => {
      unsubscribe();
      return iterator.return(value);
    },
    throw: error => {
      unsubscribe();
      return iterator.throw(error);
    },
    [Symbol.asyncIterator]: () => this,
  };
}

export default withUnsubscribe;
