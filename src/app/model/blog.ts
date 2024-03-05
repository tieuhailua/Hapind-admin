import { Admin } from "./admin";
import { BlogImage } from "./blog-image";

export class Blog {
    id:          number;
    admin?:      Admin;
    title:       string;
    brief:       string;
    content:     string;
    publishDate: string;
    status:      string;
    //blogImages:  BlogImage[];

    constructor(blog) {
        this.id = blog.id;
        this.admin= blog.admin;
        this.title= blog.title;
        this.brief= blog.brief;
        this.content= blog.content;
        this.publishDate= blog.publishDate;
        this.status= blog.status;
        //this.blogImages= blog.blogImages;
    }
}