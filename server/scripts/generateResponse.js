import { combineScrapes } from "./combineData.js"
export  default async function generateResponse(userInput) {
    return combineScrapes(userInput)
}
