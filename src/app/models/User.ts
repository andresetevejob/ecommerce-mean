import { Role } from '../enum/role';

export class User{
    email:string;
    password:string;
    name:string;
    phone:string;
    address:string;
    role:string;
    active: boolean;

    constructor(){
        this.active = true;
        this.role = Role.Customer;
    }
}