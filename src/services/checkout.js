import { getAllProduct, getTotalProduct ,getbugetReal } from "./card";

export async function createOrder(adress) {
    
    const token = localStorage.getItem("token");
    const orders = {
      cep: adress?.cep,
      city: adress?.city,
      qoute: adress?.qoute,
      clientId: localStorage.getItem("uid"),
      order_detais: {
        payForm: adress?.methodPay,
        total_Pay: getbugetReal(),
        totalPoduct: getTotalProduct(),
      },
      orders_food: getAllProduct(),
    };
  try {
       const API = await fetch(`http://localhost:8080/order`, {
         headers: {
           "Content-Type": "application/json",
           authorization: token,
         },
         body: JSON.stringify(orders),
         method: "POST",
       });
       const response = await API.json();
       console.log(response)
       if (response?.data == "created") {
         return true;
       } else {
         return false;
       }
     } catch (error) {
       return error;
     }
}