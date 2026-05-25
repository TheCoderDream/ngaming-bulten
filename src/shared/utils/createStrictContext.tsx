import { createContext, useContext } from "react";

import type { Context, ReactNode } from "react";

type StrictContext<T> = {
  Provider: (props: { value: T; children: ReactNode }) => JSX.Element;
  use: () => T;
  Context: Context<T | null>;
};

export function createStrictContext<T>(name: string): StrictContext<T> {
  const ctx = createContext<T | null>(null);
  ctx.displayName = name;

  const use = (): T => {
    const value = useContext(ctx);
    if (value === null) {
      throw new Error(`${name}.use must be called inside <${name}.Provider>`);
    }
    return value;
  };

  const Provider = ({ value, children }: { value: T; children: ReactNode }) => (
    <ctx.Provider value={value}>{children}</ctx.Provider>
  );
  Provider.displayName = `${name}.Provider`;

  return { Provider, use, Context: ctx };
}
