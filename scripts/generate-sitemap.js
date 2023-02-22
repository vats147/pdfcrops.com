const sitemap=require('sitemap-generator')
const path=require('path');

sitemap({
       baseUrl:'https://www.pdfcrops.com',
       pagesDirectory:path.resolve(__dirname,"./pages"),
       targetDirectory:'./public/',
       
       
});