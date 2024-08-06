import axios from "axios";
import cheerio from "cheerio"
import { getData } from "./groqApi.js";

export async function fetchProductDescriptions(product, url) {
    try {

        const { data } = await axios.get(url);
        
    
        const $ = cheerio.load(data);
  
        const descriptions = [];
        $('.product__description').each((index, element) => {
            descriptions.push($(element).text().trim());
        });
        let productDetails;
        if (descriptions.length == 0){
            productDetails = await getData(product, product)
        }
        else {
            productDetails = await getData(product, descriptions)
        }
        
        return productDetails;
    } catch (error) {
        console.error('Error fetching or parsing the page:', error);
        throw error;
    }
}