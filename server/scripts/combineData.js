import {scrapeEmpik} from "./scrapeDataEmpik.js";
import Book from "./scrapeClasses/Book.js";
import {scrapeSK} from "./scrapeDataSK.js";

export async function combineScrapes(userData) {
    let empikres = await scrapeEmpik(userData)
    let skres = await scrapeSK(userData)
    return new Book(empikres.books[0].title, empikres.books[0].author, empikres.books, skres.books)
}