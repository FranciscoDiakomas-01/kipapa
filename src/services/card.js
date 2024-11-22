/* eslint-disable no-unused-vars */

export function getbuget() {
  try {
    const produtos = JSON.parse(localStorage.getItem("card"));
    if (produtos?.length == 0) {
      return Number(0).toLocaleString("pt");
    } else {
      let buget = 0;
      produtos?.forEach((prod) => {
        buget += Number(prod?.price) * Number(prod?.qtd);
      });
      return Number(buget).toLocaleString("pt");
    }
  } catch (error) {
    return Number(0).toLocaleString("pt");
  }
}

export function getTotalProduct() {
  try {
    const produtos = JSON.parse(localStorage.getItem("card"));
    if (produtos?.length == 0) {
      return Number(0).toLocaleString("pt");
    } else {
      let total = 0;
      produtos?.forEach((prod) => {
        total += Number(prod?.qtd);
      });
      return Number(total);
    }
  } catch (error) {
    return Number(0);
  }
}

export function getAllProduct(produtos) {
  try {
    return JSON.parse(localStorage.getItem("card"));
  } catch (error) {
    return [];
  }
}
export function addProduct(product) {
  const olProduct = localStorage.getItem("card");
  try {
    //verificar se o Produto ja existe na lista e alterar apenas a quantidade
    const isInList = [...JSON.parse(olProduct)];
    const index = isInList.findIndex((pr) => {
      return pr.name == product.name;
    });
    if (index == -1) {
      product.qtd = 1;
      const newList = [...JSON.parse(olProduct), product];
      localStorage.setItem("card", JSON.stringify(newList));
      return;
    } else {
      //alterar a quantidade
      const isIn = isInList.find((pr) => {
        return pr.name == product.name;
      });
      isIn.qtd += 1;
      localStorage.setItem("card", JSON.stringify(isInList));
    }
  } catch (err) {
    product.qtd = 1;
    const newList = [product];
    localStorage.setItem("card", JSON.stringify(newList));
  }
}


export function removeProduct(product) {
  const olProduct = localStorage.getItem("card");
  try {
    //verificar se o Produto ja existe na lista e alterar apenas a quantidade
    const isInList = [...JSON.parse(olProduct)];
    const index = isInList.findIndex((pr) => {
      return pr.name == product.name;
    });
      //alterar a quantidade
      const isIn = isInList.find((pr) => {
        return pr.name == product.name;
      });
      if (isIn.qtd == 1) {
          //remover da lista 
            isInList.splice(index , 1)
            return localStorage.setItem("card", JSON.stringify(isInList));
      } else {
        isIn.qtd -= 1;
        return localStorage.setItem("card", JSON.stringify(isInList));
      }
    
  } catch (err) {
    product.qtd = 1;
    const newList = [product];
    localStorage.setItem("card", JSON.stringify(newList));
  }
}

export function CanChekout() {
  
  try {
    const produtos = JSON.parse(localStorage.getItem("card"));
    return produtos?.length == 0 ? false : true
  } catch (error) {
    return false;
  }
}