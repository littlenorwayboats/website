import { voyagePackages } from "./packages";
import { faqs } from "./faqs";
import {
  INSTAGRAM_URL,
  OG_IMAGE,
  SITE_AREA,
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  getSiteUrl,
} from "./site";

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#business` },
      },
      {
        "@type": ["LocalBusiness", "TouristAttraction"],
        "@id": `${siteUrl}/#business`,
        name: SITE_NAME,
        url: `${siteUrl}/`,
        description: SITE_DESCRIPTION,
        image: absoluteUrl(OG_IMAGE.url),
        areaServed: {
          "@type": "Place",
          name: SITE_AREA,
        },
        sameAs: [INSTAGRAM_URL],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Voyage packages",
          itemListElement: voyagePackages.map((item) => ({
            "@type": "Offer",
            name: item.name,
            description: `${item.length}. ${item.detail}`,
            url: absoluteUrl(`/?package=${item.slug}#booking`),
          })),
        },
      },
    ],
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
