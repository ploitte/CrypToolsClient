export class User{

    token:string;
    id:number;
    name:string;
    email:string;

    constructor(token:string,id:number,name:string,email:string){
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }

}