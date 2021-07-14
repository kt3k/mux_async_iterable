// Copyright 2020 Yoshiya Hinosawa. All rights reserved. MIT license.
import {
  assertEquals,
} from "https://deno.land/std@0.101.0/testing/asserts.ts";
import { mux } from "./mod.ts";

function defer(n: number) {
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

Deno.test("mux returns an async iterator that merges the given async iterators.", async () => {
  const iter = mux(foo(), bar(), baz());
  assertEquals(await iter.next(), { done: false, value: 10 });
  assertEquals(await iter.next(), { done: false, value: 20 });
  assertEquals(await iter.next(), { done: false, value: 30 });
  assertEquals(await iter.next(), { done: false, value: 40 });
  assertEquals(await iter.next(), { done: false, value: 50 });
  assertEquals(await iter.next(), { done: false, value: 60 });
  assertEquals(await iter.next(), { done: false, value: 70 });
  assertEquals(await iter.next(), { done: false, value: 80 });
  assertEquals(await iter.next(), { done: false, value: 90 });
  assertEquals(await iter.next(), { done: true, value: undefined });
});
