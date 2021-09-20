// Copyright 2020 Yoshiya Hinosawa. All rights reserved. MIT license.

/** Returns an async iterator which merges the given async iterators. */
export function mux<T>(
  ...iters: AsyncIterator<T>[]
): AsyncIterableIterator<T> {
  return new MuxAsyncIterable<T>(iters);
}

class MuxAsyncIterable<T> implements AsyncIterable<T> {
  private nexts: Promise<IteratorResult<T>>[];
  constructor(private iters: AsyncIterator<T>[]) {
    this.nexts = this.iters.map((iter) => iter.next());
  }

  async next(): Promise<IteratorResult<T>> {
    while (this.iters.length > 0) {
      const { next } = await Promise.race(
        this.nexts.map(async (next) => {
          await next;
          return { next };
        }),
      );
      const i = this.nexts.indexOf(next);
      const res = await next;

      if (res.done) {
        this.nexts.splice(i, 1);
        this.iters.splice(i, 1);
        continue;
      }

      if (!res.done) {
        this.nexts.splice(i, 1, this.iters[i].next());
        return { done: false, value: res.value };
      }
    }

    return { done: true, value: undefined };
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
}
