import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/*
          THESIS: A portfolio that IS a Windows 95 machine — a beveled OS window
          running a live CRT terminal. Refuses the flat macOS-traffic-light
          terminal template the category defaults to.
          OWN-WORLD: Silver 3D-bevel chrome (double inset light/dark edges),
          blue-gradient titlebar, MS Sans Serif, File/Edit/View/Help menu, sunken
          status bar with live clock; teal dithered desktop with launcher icons;
          console = black CRT with phosphor text, scanlines, flicker, glow.
          STORY: Visitor boots into Marko's desktop, reads the AVRAMARE brand,
          runs commands (or double-clicks icons) to explore, reskins via View.
          FIRST VIEWPORT: Centered Win95 window, CRT power-on, boot log, then the
          AVRAMARE ASCII wordmark + tagline bar and starter commands; input at
          bottom, launcher icons left.
          FORM: Win95 desktop OS (user-pinned direction; concept roll skipped).
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.
          */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
