export const createPayment = async (

  data:any

) => {


  // Later:
  // 1. Validate order
  // 2. Call payment gateway
  // 3. Save transaction
  // 4. Publish PAYMENT_COMPLETED event


  return {

    id:1,

    status:"SUCCESS",

    ...data

  };

};



export const findPayment = async (

  id:string

) => {


  return {

    id,

    status:"SUCCESS"

  };

};