class BookObject {
    title : string;
    price : number;
    author : string;
    blink : string;
    btype : string;
    cover : string;
    constructor(title: string, price: number, author: string, blink: string, btype: string, cover: string) {
        this.title = title;
        this.price = price;
        this.author = author;
        this.blink = blink;
        this.btype = btype;
        this.cover = cover;
    }
}

export default BookObject;