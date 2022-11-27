export {}

declare global {
  // exclude methods from the type, but not getters and setters
  type ExcludeMethods<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>

  // detect if two types X and Y are exactly identical
  type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B

  // writable keys are those which are exactly equal when you strip readonly off in a mapped type
  type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
  }[keyof T]

  // maintain only the properties from a type
  type PickProps<T> = Pick<T, WritableKeys<ExcludeMethods<T>>>
}
