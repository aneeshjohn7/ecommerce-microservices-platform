export interface Payment {


  id:number;


  orderId:number;


  amount:number;


  status:
    | "PENDING"
    | "SUCCESS"
    | "FAILED";


}