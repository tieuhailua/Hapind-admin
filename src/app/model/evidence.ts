export class Evidence {
    id: number;
    image: string;

    constructor(evidence) {
        this.id = evidence.id;
        this.image= evidence.image;
    }
}