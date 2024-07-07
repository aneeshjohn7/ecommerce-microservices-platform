export const create = async (
  data:any
) => {


  // Later:
  // save product into catalog database
  // publish PRODUCT_CREATED event


  return {

    id:1,

    ...data

  };

};



export const findAll = async () => {


  // Later:
  // fetch products from database


  return [];

};