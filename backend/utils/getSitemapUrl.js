export function extractSitemapUrl(robotsTxt) {
    const sitemapRegex = /Sitemap:\s*(\S+)/i;
    const match = robotsTxt.match(sitemapRegex);
    return match ? match[1] : null;
}