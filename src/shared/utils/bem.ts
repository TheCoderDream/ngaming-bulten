import clsx from "clsx";

type Styles = Record<string, string>;

export function bem(styles: Styles, block: string) {
  return (part?: string, mods: Record<string, boolean | undefined | null> = {}) => {
    const base = part ? `${block}__${part}` : block;
    const modClasses = Object.entries(mods)
      .filter(([, on]) => Boolean(on))
      .map(([m]) => `${base}--${m}`);

    return clsx(styles[base], ...modClasses.map((c) => styles[c]));
  };
}
