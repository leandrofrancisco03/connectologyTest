import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  schema?: any;
}

export function SEO({ title, description, keywords, schema }: SEOProps) {
  const defaultTitle = "Automatización con IA y n8n en Perú | ConnectologyIA";
  const defaultDescription = "Automatizamos tu negocio con Agentes IA, n8n y Python. Workflows inteligentes a medida. ¿Listo para ahorrar tiempo y escalar? Contáctanos hoy.";
  const defaultKeywords = ["Inteligencia Artificial", "Automatización", "Agentes IA", "LangChain", "n8n", "Desarrollo Web"];
  
  const siteTitle = title ? `${title} | ConnectologyIA` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteKeywords = keywords ? keywords.join(", ") : defaultKeywords.join(", ");

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness", 
    "name": "ConnectologyIA",
    "image": "https://connectologyia.pages.dev/logo-connectologyia.png",
    "telephone": "+51970430127",
    "email": "connectologyaia@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Juan de Lurigancho",
      "addressRegion": "Lima",
      "addressCountry": "PE"
    },
    "url": "https://connectologyia.pages.dev"
  };

  const schemaJson = schema || defaultSchema;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />

      <script type="application/ld+json">
        {JSON.stringify(schemaJson)}
      </script>
    </Helmet>
  );
}
