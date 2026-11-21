import { GoogleTagManager } from "@next/third-parties/google";
import { publicConfig } from "@/lib/config";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? publicConfig.gtmId;

const gtmInDev = process.env.NEXT_PUBLIC_GTM_IN_DEV === "true";

function gtmEnabled() {
  if (!gtmId) return false;
  if (process.env.NODE_ENV === "production") return true;
  return gtmInDev;
}

export function Gtm() {
  if (!gtmEnabled()) {
    return null;
  }

  return (
    <>
      <GoogleTagManager gtmId={gtmId} />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}