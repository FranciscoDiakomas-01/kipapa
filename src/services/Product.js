

export async function getAllProduct(page = 1, limit = 10) {
     try {
       const API = await fetch(
         `http://localhost:8080/product?page=${page}&limit=${limit}`,
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       const response = await API.json();
       return response
     } catch (error) {
       return error;
     }
}


export async function getAllProductByCategory(page = 1, limit = 10 , id) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(
      `http://localhost:8080/productbyCategory/${id}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    const response = await API.json();
    return response;
  } catch (error) {
    return error;
  }
}
