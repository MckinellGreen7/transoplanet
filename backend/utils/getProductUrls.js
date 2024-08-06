import xml2js from "xml2js"

export function extractProductUrls(xmlData) {
  const parser = new xml2js.Parser();
  const productUrls = [];

  parser.parseString(xmlData, (err, result) => {
    if (err) {
      throw new Error('Error parsing XML');
    }

    const sitemaps = result.sitemapindex.sitemap;
    sitemaps.forEach((sitemap) => {
      const loc = sitemap.loc[0];
      if (loc.includes('products')) {
        productUrls.push(loc);
      }
    });
  });

  return productUrls;
}