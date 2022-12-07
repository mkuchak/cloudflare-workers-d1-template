declare global {
  type ClassProps<T> = Pick<
    T,
    {
      [K in keyof T]: T[K] extends Function ? never : K;
    }[keyof T] &
      {
        [P in keyof T]-?: {
          [Q in P]: T[P];
        } extends {
          -readonly [Q in P]: T[P];
        }
          ? P
          : never;
      }[keyof T]
  >;
}

export {};
