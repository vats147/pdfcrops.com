import React from 'react';

const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }) => {
    const BASE_URL = 'http://localhost:3000';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   
    <urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

<url>
<loc>https://www.pdfcrops.com/</loc>
<lastmod>2023-01-29T12:16:24+01:00</lastmod>
<priority>1.00</priority>
</url>
<url>
<loc>https://www.pdfcrops.com/tos</loc>
<lastmod>2023-01-29T12:16:24+01:00</lastmod>
<priority>0.8</priority>
</url>
<url>
<loc>https://www.pdfcrops.com/tools/pdf/crop</loc>
<lastmod>2023-01-29T12:16:24+01:00</lastmod>
<priority>0.9</priority>
</url>

<url>
<loc>https://www.pdfcrops.com/contact</loc>
<lastmod>2023-01-29T12:16:24+01:00</lastmod>
<priority>0.2</priority>
</url>

<url>
<loc>https://www.pdfcrops.com/privacyPolicy</loc>
<lastmod>2023-01-29T12:16:24+01:00</lastmod>
<priority>0.2</priority>
</url>
</urlset>
  `;

   res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;