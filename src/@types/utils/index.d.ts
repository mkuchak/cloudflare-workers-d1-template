declare global {
  type ExcludeMethods<T> = Pick<
    T,
    { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
  >;
  type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B;
  type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<
      { [Q in P]: T[P] },
      { -readonly [Q in P]: T[P] },
      P
    >;
  }[keyof T];
  type ClassProps<T> = Pick<T, WritableKeys<ExcludeMethods<T>>>;
}

export {};
