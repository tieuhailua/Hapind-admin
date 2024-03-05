export class BlogImage {
    id:        number;
    imagePath: string;

    constructor(blogImage){
        this.id = blogImage.id;
        this.imagePath = blogImage.imagePath;
    }
}