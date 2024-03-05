export class Habit {
    id: number;
    name: string;

    constructor(habit) {
        this.id = habit.id;
        this.name= habit.name;
    }
}