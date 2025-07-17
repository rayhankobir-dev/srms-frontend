export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || process.env.NEXT_APP_NAME,
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL || process.env.NEXT_APP_LOGO_URL || "/images/logo.png",
  url: "/",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description: "The simplest dashboard template.",
  baseLinks: {
    quotes: {
      overview: "/quotes/overview",
      monitoring: "/quotes/monitoring",
      audits: "/quotes/audits",
    },
  },
};

export type siteConfig = typeof siteConfig;
