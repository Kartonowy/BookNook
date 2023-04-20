
import * as cheerio from 'cheerio';
import axios from 'axios';
import Empik from './scrapeClasses/Empik.js'

export async function scrapeEmpik(userInput) {
    let bookArray = [];

    await axios.get(`https://www.empik.com/szukaj/produkt?q=${userInput}&qtype=basicForm/`, {
        proxy: {
            host: 'http://localhost/express_backend',
            port: '5000',
        },
    })
        .then(response => {
            console.log(response)
            const $ = cheerio.load(response.data);
            $('.search-content .search-list-item').each((i, elem)=>{
                if ($(elem).find('.category-line .ta-product-category').text().trim() === 'Książki') {
                    let title = $(elem).find('h2 a').text().trim();
                    let author = $(elem).find('.smartAuthorWrapper .smartAuthor').text().trim()
                    let price = $(elem).find('.price').text().trim()
                    let link = `https://www.empik.com${$(elem).find('.product-title a').attr('href')}`
                    let type = $(elem).find('.category-line .ta-product-carrier').text().split(',')[0].trim()
                    bookArray.push({title, author, price, link, type})
                }
            })
        })
        .catch(err => {console.error(err);})
    return new Empik(bookArray)
}