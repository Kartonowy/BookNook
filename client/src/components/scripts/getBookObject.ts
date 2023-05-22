import axios, {AxiosResponse} from 'axios';

export async function getBookObject(userInput : string) {
    let finalres : AxiosResponse
    await axios.get(`/api/books/getBookPrices/:${userInput}`)
        .then(response => {
            finalres = response;
        })
    return finalres!.data
}

