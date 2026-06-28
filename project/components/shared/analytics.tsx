'use client';

import Script from 'next/script';

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) return null;

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              send_page_view: false,
            });
          `,
        }}
      />
    </>
  );
}

export function TrackPageView() {
  'use client';

  return (
    <Script
      id="track-pageview"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          if (window.gtag) {
            window.gtag('event', 'page_view', {
              page_path: window.location.pathname,
            });
          }
        `,
      }}
    />
  );
}
