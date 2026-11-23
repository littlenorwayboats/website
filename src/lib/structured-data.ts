import { voyagePackages } from "./packages";
import { faqs } from "./faqs";
import type { LogbookArticle } from "./logbook";
import { logbookArticlePath } from "./paths";
import {
  INSTAGRAM_URL,
  OG_IMAGE,
  SITE_ADDRESS,
  SITE_DESCRIPTION,
  SITE_GEO,
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
        "@type": ["LocalBusiness", "BoatRental", "TouristAttraction"],
        "@id": `${siteUrl}/#business`,
        name: SITE_NAME,
        url: `${siteUrl}/`,
        description: SITE_DESCRIPTION,
        image: absoluteUrl(OG_IMAGE.url),
        address: {
          "@type": "PostalAddress",
          ...SITE_ADDRESS,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE_GEO.latitude,
          longitude: SITE_GEO.longitude,
        },
        areaServed: {
          "@type": "Place",
          name: "Liberty Bay, Poulsbo, WA",
          geo: {
            "@type": "GeoCoordinates",
            latitude: SITE_GEO.latitude,
            longitude: SITE_GEO.longitude,
          },
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

export function articleJsonLd(article: LogbookArticle) {
  const siteUrl = getSiteUrl();
  const url = absoluteUrl(logbookArticlePath(article.slug));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: article.title,
        description: article.description,
        image: absoluteUrl(article.image ?? OG_IMAGE.url),
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        inLanguage: "en-US",
        ...(article.tags.length > 0 ? { keywords: article.tags } : {}),
        author: { "@id": `${siteUrl}/#business` },
        publisher: { "@id": `${siteUrl}/#business` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", path: "/" },
          { name: "Logbook", path: "/logbook" },
          { name: article.title, path: logbookArticlePath(article.slug) },
        ].map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: absoluteUrl(crumb.path),
        })),
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
        text: item.answer.replace(/<[^>]*>/g, ""),
      },
    })),
  };
}

