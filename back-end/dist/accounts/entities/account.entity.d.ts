import { Model } from 'sequelize-typescript';
export declare class Account extends Model {
    id: string;
    name: string;
    balance: number;
    subdomain: string;
}
