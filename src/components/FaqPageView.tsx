import { FAQ } from "./FAQ";
import { JsonLd } from "./JsonLd";
import { faqJsonLd } from "@/lib/structured-data";

export function FaqPageView() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <FAQ />
    </>
  );
}
