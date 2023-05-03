import * as cheerio from 'cheerio';
import axios from 'axios';
import Empik from './scrapeClasses/Empik.js'
import {handleRedirects} from "./handleRedirects.js";

export async function scrapeEmpik(userInput) {
    let bookArray = [];

    await axios.get(`https://www.empik.com/szukaj/produkt?q=${userInput}&qtype=basicForm/`)
        .then(async response => {
            const $ = cheerio.load(response.data);
            $('.search-content .search-list-item').each((i, elem)=>{
                if ($(elem).find('.category-line .ta-product-category').text().trim() === 'Książki') {
                    let title = $(elem).find('h2 a').text().trim();
                    let author = $(elem).find('.smartAuthorWrapper').text().trim()
                    let price = $(elem).find('.price').text().trim()
                    let link = `https://www.empik.com${$(elem).find('.product-title a').attr('href')}`
                    let type = $(elem).find('.category-line .ta-product-carrier').text().split(',')[0].trim()
                    bookArray.push({title, author, price, link, type})
                }
            })
            if (bookArray.length === 0) {
                let xd = await handleRedirects("Empik", response.request.path)
                console.log(xd)
                bookArray.push(await handleRedirects("Empik", response.request.path))
            }
        })
        .catch(err => {console.error(err);})
    return new Empik(bookArray)
}