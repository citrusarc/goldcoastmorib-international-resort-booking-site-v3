import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";
import { PageEdit, PageStar, PrivacyPolicy } from "iconoir-react";

import "@/app/globals.css";
import Navbar from "@/components/ui/Navbar";
import PromoModal from "@/components/ui/PromoModal";
import LockScreen from "@/components/ui/LockScreen";

export const metadata: Metadata = {
  title:
    "Gold Coast Morib International Resort | Beachfront Getaway in Malaysia",
  description:
    "Experience luxury and relaxation at Gold Coast Morib International Resort — Malaysia’s premier beachfront destination offering family-friendly stays, water park fun, and seaside tranquility.",

  keywords: [
    "Gold Coast Morib",
    "Gold Coast Morib International Resort",
    "Morib resort",
    "beachfront resort Malaysia",
    "family resort Selangor",
    "holiday resort Morib",
    "Malaysia beach holiday",
    "water park resort Malaysia",
    "coastal getaway",
    "luxury seaside resort",
  ],

  openGraph: {
    title: "Gold Coast Morib International Resort | Luxury Beachfront Escape",
    description:
      "Enjoy a beachfront paradise with family-friendly amenities, thrilling water park experiences, and scenic coastal views at Gold Coast Morib International Resort.",
    url: "https://www.goldcoastmoribresort.com",
    siteName: "Gold Coast Morib International Resort",
    images: [
      {
        url: "https://www.goldcoastmoribresort.com/Images/banner.png",
        width: 1200,
        height: 630,
        alt: "Gold Coast Morib International Resort Beachfront View",
      },
    ],
    locale: "en_MY",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gold Coast Morib International Resort | Beachfront Family Getaway",
    description:
      "Discover the perfect beachfront retreat in Malaysia — family fun, seaside comfort, and water park excitement await at Gold Coast Morib International Resort.",
    images: ["https://www.goldcoastmoribresort.com/Images/banner.png"],
    creator: "@goldcoastmorib",
  },

  alternates: {
    canonical: "https://www.goldcoastmoribresort.com",
  },

  metadataBase: new URL("https://www.goldcoastmoribresort.com"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  category: "Travel & Hospitality",

  other: {
    "application-name": "Gold Coast Morib International Resort",
    "theme-color": "#0077b6",
    "og:locale": "en_MY",
    "og:type": "website",
    "ai-summary":
      "Gold Coast Morib International Resort is a luxurious beachfront destination in Malaysia, perfect for family vacations, seaside getaways, and water park adventures.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLocked = false;
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f59e0b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FCJQJHEQ4E"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FCJQJHEQ4E');
          `}
        </Script>
        <Script
          id="ldjson-hotel"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              "@id": "https://www.goldcoastmoribresort.com/#hotel",
              name: "Gold Coast Morib International Resort",
              alternateName: "Gold Coast Morib Resort",
              description:
                "Gold Coast Morib International Resort is a premier beachfront destination in Malaysia offering family-friendly rooms, water park fun, and scenic coastal escapes.",
              url: "https://www.goldcoastmoribresort.com",
              logo: "https://www.goldcoastmoribresort.com/Images/brand-logo.png",
              image: "https://www.goldcoastmoribresort.com/Images/banner.png",
              foundingDate: "2005",
              founder: {
                "@type": "Organization",
                name: "Gold Coast Morib International Resort Management",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "reservation@goldcoastresort.com.my",
                telephone: "+601131231028",
                contactType: "Customer Service",
                availableLanguage: ["English", "Malay"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "PT 294, Kawasan Kanchong Laut, Mukim Morib, Morib Beach",
                addressLocality: "Banting",
                addressRegion: "Selangor",
                postalCode: "42700",
                addressCountry: "MY",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 2.7401,
                longitude: 101.5012,
              },
              checkinTime: "14:00",
              checkoutTime: "12:00",
              openingHours: "Mo-Su 00:00-23:59",
              priceRange: "RM",
              areaServed: {
                "@type": "Country",
                name: "Malaysia",
              },
              makesOffer: {
                "@type": "OfferCatalog",
                name: "Hotel Amenities & Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Water Park",
                      description:
                        "Enjoy thrilling water slides, pools, and splash areas suitable for all ages.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Beachfront Access",
                      description:
                        "Relax on pristine beaches directly accessible from the resort.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Family-Friendly Facilities",
                      description:
                        "Activities, rooms, and amenities designed for families with children.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Swimming Pool",
                      description:
                        "Multiple pools including infinity and leisure pools for all guests.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "On-Site Restaurant",
                      description:
                        "Diverse dining options featuring local and international cuisines.",
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.2",
                reviewCount: "2150",
              },
              sameAs: [
                "https://www.facebook.com/goldcoastmoribresort",
                "https://www.instagram.com/goldcoastmoribresort",
                "https://maps.google.com/?q=Gold+Coast+Morib+International+Resort",
              ],
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="relative antialiased overflow-x-hidden overflow-y-auto max-w-full"
      >
        {isLocked && <LockScreen />}
        <PromoModal />
        <Navbar />
        <main>{children}</main>
        <footer className="space-y-8 sm:space-y-4 py-16 w-full text-neutral-400">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 mx-auto max-w-6xl items-center sm:justify-between text-center">
            <div className="flex flex-col sm:flex-row gap-2 items-center order-2 sm:order-2">
              <a href="tel:+601131231028" className="hover:text-amber-500">
                +601131231028
              </a>
              <p className="hidden sm:block">/</p>
              <a
                href="mailto:reservation@goldcoastresort.com.my"
                className="hover:text-amber-500"
              >
                reservation@goldcoastresort.com.my
              </a>
            </div>
            <div className="order-3 sm:order-1 flex items-center gap-8 sm:gap-4">
              <Link href="/term-of-use" className="hover:text-amber-500">
                <PageEdit className="w-6 h-6" />
              </Link>
              <Link href="/privacy-policy" className="hover:text-amber-500">
                <PrivacyPolicy className="w-6 h-6" />
              </Link>
              <Link href="/refund-policy" className="hover:text-amber-500">
                <PageStar className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 mx-auto max-w-6xl items-center sm:justify-between text-center">
            <p className="order-1 sm:order-1">
              GOLD COAST HOSPITALITY SDN. BHD.
              <span> 200301008626 (611046)</span>
            </p>
            <p className="order-4 sm:order-2">
              © {new Date().getFullYear()} GOLD COAST MORIB INTERNATIONAL RESORT
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
