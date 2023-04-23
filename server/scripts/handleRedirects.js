import * as cheerio from 'cheerio';
import axios from 'axios';
import Empik from './scrapeClasses/Empik.js'
export async function handleRedirects(site, path) {
    let title, author, price, link, type, returnValue;
    if (site === "Empik") {
        await axios.get(`https://www.empik.com${path}`)
            .then(response => {
                const $ = cheerio.load(response.data)
                title = $('h1.ta-product-title').text().trim().split("(")[0].replace("\n","").replace("\n","")
                author = $('span.ta-value a.smartAuthor').text().trim();
                price = $('div.productPriceInfo__wrapper span.ta-price').text().trim();
                link = `https://www.empik.com${path}`
                type = $('span.ta-product-carrier').text().trim().replace("(", "").replace(")","")
                returnValue = {title, author, price, link, type}

            })
            .catch(err => {console.error(err);})
    }
    return returnValue
}