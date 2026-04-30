import "./globals.css";

export const metadata = {
  title: "ChoZen Colombia — A Regenerative Community in the Colombian Highlands",
  description:
    "ChoZen Colombia is a living community built around wellbeing, regenerative agriculture, and a deep connection to the land and culture of Colombia. Future of Cities × ChoZen × Click Clack.",
  metadataBase: new URL("https://colombia.chozen.org"),
  openGraph: {
    title: "ChoZen Colombia — A Regenerative Community in the Colombian Highlands",
    description:
      "A living community built around wellbeing, regenerative agriculture, and a deep connection to the land and culture of Colombia.",
    images: [
      {
        url: "/finca/ChoZen-Colombia.png",
        width: 1200,
        height: 630,
        alt: "ChoZen Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChoZen Colombia — A Regenerative Community in the Colombian Highlands",
    images: ["/finca/ChoZen-Colombia.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
