export const create = async(data:any)=>{

  // later:
  // save order into database
  // publish ORDER_CREATED event

  return {
    id:1,
    ...data
  };
};


export const findAll = async()=>{

  return [];
};