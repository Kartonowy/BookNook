// noinspection JSCheckFunctionSignatures

import * as cheerio from 'cheerio';
import axios from 'axios';
import SK from './scrapeClasses/SwiatKsiazki.js'

export async function scrapeSK(userInput) {
   let  skArray = [];
    await axios.get(`https://www.swiatksiazki.pl/catalogsearch/result/?q=${userInput}`)
        .then(response => {
            const $ = cheerio.load(response.data);
                $('.product-items .item').each((i,elem)=>{
                    if ($(elem).find('div.product-item-type').text().split('|')[0].trim() === 'Książki') {
                        let title = $(elem).find('strong a').text();
                        let author = $(elem).find('span a ').text();
                        let price = $(elem).find('.special-price span.price-wrapper span.price').text();
                        let type = $(elem).find('div.product-item-type').text();
                        let link = $(elem).find('.product-item-link').attr('href');
                        skArray.push({title, author, price, link, type});
                    }
                })
        })
        .catch(err=>{console.error(err);})
    return new SK(skArray);

}