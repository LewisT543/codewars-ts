
// This is fucking wizardry
// 1. Define the fn to call recursively using outer + inner inputs
// 2. override the valueOf property of fn, causing it tp return the outer input instead of a function reference
// 3. call fn to start the recursion
export default function add(x: number): any {
  const fn = (y: number) => add(x + y)
  fn.valueOf = () => x
  return fn
}