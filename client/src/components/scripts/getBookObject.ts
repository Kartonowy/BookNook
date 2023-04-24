import axios, {AxiosResponse} from 'axios';

export async function getBookObject(userInput : string) {
    let finalres : AxiosResponse
    await axios.get(`http://localhost:5000/get-book-prices/:${userInput}`)
        .then(response => {
            finalres = response;
        })
    return finalres!.data
}

