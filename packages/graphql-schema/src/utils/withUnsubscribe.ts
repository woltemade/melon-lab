import { $$asyncIterator } from 'iterall';

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
    [$$asyncIterator]() {
      return this;
    },
  };
}

export default withUnsubscribe;
