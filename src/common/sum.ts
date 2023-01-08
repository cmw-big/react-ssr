export interface SumParams {
  a: number
  b: number
}

export default (p: SumParams) => {
  return p.a + p.b
}
