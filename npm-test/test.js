const { mux } = require("mux-async-iterable");
const assert = require("assert");

function defer(n) {
  return new Promise((resolve, _) => setTimeout(resolve, n));
}

async function* foo() {
  await defer(10);
  yield 10;
  await defer(30);
  yield 40;
  await defer(30);
  yield 70;
}

async function* bar() {
  await defer(20);
  yield 20;
  await defer(30);
  yield 50;
  await defer(30);
  yield 80;
}

async function* baz() {
  await defer(30);
  yield 30;
  await defer(30);
  yield 60;
  await defer(30);
  yield 90;
}

async function test() {
  const iter = mux(foo(), bar(), baz());
  assert.deepStrictEqual(await iter.next(), { done: false, value: 10 });
  assert.deepStrictEqual(await iter.next(), { done: false, value: 20 });
  assert.deepStrictEqual(await iter.next(), { done: false, value: 30 });
  assert.deepStrictEqual(await iter.next(), { done: false, value: 40 });
  assert.deepStrictEqual(await iter.next(), { done: false, value: 50 });
  assert.deepStrictEqual(await iter.next(), { done: false, value: 60 });
  assert.deepStrictEqual(await iter.next(), { done: false, value: 70 });
  assert.deepStrictEqual(await iter.next(), { done: false, value: 80 });
  assert.deepStrictEqual(await iter.next(), { done: false, value: 90 });
  assert.deepStrictEqual(await iter.next(), { done: true, value: undefined });
}

test();
