import axios from "axios";
import { extractSitemapUrl } from "./getSitemapUrl.js";
import { extractProductUrls } from "./getProductUrls.js";
import { extractProductData } from "./getProduct.js";
import { fetchProductDescriptions } from "./getProductDetails.js";

export async function scrape(url){
    let sitemap = await axios.get(`${url}/robots.txt`)
    sitemap = sitemap.data
    sitemap = extractSitemapUrl(sitemap)
    let sitemapData = await axios.get(`${sitemap}`)
    sitemapData = sitemapData.data
    let productsUrl = extractProductUrls(sitemapData)
    let productsData = await axios.get(`${productsUrl}`)
    productsData = productsData.data
    let productDetails = await extractProductData(productsData)
    await Promise.all(productDetails.map(async (product) => {
        const segments = product.loc.split('/');
        const page = segments.pop();
        product.details = await fetchProductDescriptions(page, product.loc);
    }));
    return productDetails
}