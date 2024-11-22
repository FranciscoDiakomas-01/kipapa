import { getAllProduct, getTotalProduct, getbuget } from "./card";

export function checkout(checkoutDetails) {

    const check = {
        protuct: getAllProduct(),
        budget: getbuget(),
        totalProduct: getTotalProduct(),
        methodPay: checkoutDetails.methodPay,
        adress: {
            street: checkoutDetails.street,
            Nhouse: checkoutDetails.Nhouse,
            qoute: checkoutDetails.qoute,
            city: checkoutDetails.city,
        },
    };
    console.log(check)
}