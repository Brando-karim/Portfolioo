import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karim Benjelloul — Portfolio",
  description:
    " Full-Stack Developer based in Tangier, Morocco. Building web apps with React, Laravel, and MySQL. Open to local, remote, and EU opportunities.",
  openGraph: {
    title: "Karim Benjelloul — Portfolio",
    description:
      "Portfolio of Karim Benjelloul,  full-stack developer specializing in React, Laravel, and modern JavaScript.",
    type: "website",
    url: "https://karimbenjelloul.me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karim Benjelloul — Portfolio",
    description:
      "Portfolio of Karim Benjelloul, junior full-stack developer specializing in React, Laravel, and modern JavaScript.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karim Benjelloul",
  jobTitle: "Full-Stack Developer",
  url: "https://karimbenjelloul.me",
  sameAs: [
    "https://github.com/Brando-karim",
    "https://linkedin.com/in/karim-ben-jelloul-623765270",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tangier",
    addressCountry: "MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
