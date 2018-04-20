export class User {
    constructor(public id: string,
                public name: string,
                public username: string,
                public email: string,
                public status: "active" | "passive" | "pending",
                public created_at: Date,
                public updated_at: Date,) {
    }
}