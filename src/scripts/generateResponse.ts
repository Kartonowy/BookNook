import {combineScrapes} from "./combineData"
export default async function generateResponse(userInput : string) {
    console.log(combineScrapes(userInput))
}
