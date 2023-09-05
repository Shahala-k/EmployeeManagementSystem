import { LeaveApplication } from "./leaveapplication"; 

export interface Employee {
  
    id: string;
    name: string;
    age: number;
    dob: string;
    image: string;
    Blood_group: string;
    gender: string;
    email: string;
   phone: string;
    leaves:number
    position: string;
    package: string;
    status:string,
    username:string,
    password:string,
    leaveDetails: LeaveApplication[];

    
  }