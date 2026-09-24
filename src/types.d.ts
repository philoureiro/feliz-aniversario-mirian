import "react";

// permite variáveis CSS (ex.: { "--r": "3deg" }) no atributo style
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
