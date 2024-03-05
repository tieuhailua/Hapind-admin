import { Banned } from "./banned";
import { Blog } from "./blog";

export class Admin {
    id: number;
    username: string;
    password: string;
    role: string;
    banneds: Banned[];
    blogs: Blog[];

    constructor(admin) {
        this.id = admin.id;
        this.username= admin.username;
        this.password = admin.password;
        this.username= admin.username;
        this.role = admin.role;
        this.banneds= admin.banneds;
        this.blogs= admin.blogs;
    }
}