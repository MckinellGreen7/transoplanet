import xml2js from "xml2js";

export async function extractProductData(xmlData) {
    const parser = new xml2js.Parser();
    try {
        const result = await parser.parseStringPromise(xmlData);
    
        const urls = result.urlset.url || [];
        
        const products = urls
            .map(url => {
                const loc = url.loc ? url.loc[0] : '';
                const image = url['image:image'] && url['image:image'][0];
                const imageLoc = image ? (image['image:loc'] ? image['image:loc'][0] : '') : '';
                const imageTitle = image ? (image['image:title'] ? image['image:title'][0] : '') : '';
                
                return {
                    loc,
                    imageLoc,
                    imageTitle
                };
            })
            .filter(product => product.loc && product.imageLoc && product.imageTitle)
            .slice(0, 5); 

        return products;
    } catch (error) {
        console.error('Error parsing XML:', error);
        throw error;
    }
}
