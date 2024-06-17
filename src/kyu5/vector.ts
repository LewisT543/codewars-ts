
const zipArrays = <T>(first: T[], second: T[]): T[][] => {
  return first.map((_, ind) => [first[ind], second[ind]])
}

export class Vector {
  private components: number[];

  constructor(components: number[]) {
    this.components = components
  }

  public add(other: Vector): Vector {
    this.lengthEqOrError(other)
    return new Vector(zipArrays(this.components, other.components)
      .reduce((acc, cur) => [...acc, cur[0] + cur[1]], []))
  }

  public subtract(other: Vector): Vector {
    this.lengthEqOrError(other)
    return new Vector(zipArrays(this.components, other.components)
      .reduce((acc, cur) => [...acc, cur[0] - cur[1]], []))
  }

  public dot(other: Vector): number {
    this.lengthEqOrError(other)
    return zipArrays(this.components, other.components)
      .reduce((acc, cur) => acc + (cur[0] * cur[1]), 0)
  }

  public norm(): number {
    return Math.sqrt(this.components
      .map(num => Math.pow(num, 2))
      .reduce((acc, cur) => acc + cur))
  }

  public toString(): string {
    return `(${this.components.join(',')})`
  }

  public equals(other: Vector): boolean {
    if (this.components.length !== other.components.length) return false
    return this.components.length === this.components.filter((el, ind) => el === other.components[ind]).length
  }

  private lengthEqOrError = (other: Vector) => {
    if (this.components.length !== other.components.length) throw new Error(""); return false
  }
}