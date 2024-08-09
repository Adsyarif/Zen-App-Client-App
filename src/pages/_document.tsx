import { Navigation, Footer } from "@/components/common";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navigation />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
