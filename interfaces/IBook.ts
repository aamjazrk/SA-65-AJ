import { BookTypesInterface } from "./IBookType";
import { EmployeesInterface } from "./IEmployee";
import { RolesInterface } from "./IRole";
import { ShelfsInterface } from "./IShelf";
export interface BookInterface{
    ID?: number;
    Name?: string;
    EmpID?: number;
    Employee?: EmployeesInterface;
    BooktypeID?: number;
    Booktype?:BookTypesInterface;
    RoleID?: number;
    Role?: RolesInterface;
    ShelfID?: number;
    Shelf?: ShelfsInterface;
    Author?: string;
    Page?: number ;
    Quantity?: number;
    Price?: number;
    Date?: Date | null;

}