import axios, {AxiosResponse} from 'axios';

export async function getBookObject(userInput : string) {
    let finalres : AxiosResponse
    await axios.get(`/get-book-prices/:${userInput}`)
        .then(response => {
            finalres = response;
        })
    return finalres!.data
}

