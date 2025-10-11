// src/model-viewer.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string
      "auto-rotate"?: boolean | string
      "camera-controls"?: boolean | string
      "environment-image"?: string
      "poster"?: string
      "reveal"?: string
      "loading"?: string
    }
  }
}
