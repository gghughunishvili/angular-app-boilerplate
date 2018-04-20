export class User {
    constructor(public id: string,
                public name: string,
                public username: string,
                public email: string,
                public status: "active" | "passive" | "pending",
                public createdAt: Date,
                public updatedAt: Date,) {
    }
}