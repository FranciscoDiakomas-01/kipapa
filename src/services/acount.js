export async function getClientData() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("uid");
  try {
    const API = await fetch(
      `https://kipapa-backend.onrender.com/client/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    const response = await API.json();
    if (response?.data?.length > 0) {
      return response?.data[0];
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export async function UpdateClient(client) {
  const token = localStorage.getItem("token");
    const id = localStorage.getItem("uid");
  try {
    if (!client) {
      return false;
    }
    const API = await fetch(
      `https://kipapa-backend.onrender.com/client/${id}`,
      {
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(client),
      }
    );
      const response = await API.json();
      console.log(response)
    if (response?.msg == "updated") {
      return true;
    } else if (response?.msg == "wrong password") {
      return response?.msg;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}


export function validateCep(cep){
    const cepPattern = /^[0-9]{5}-?[0-9]{3}$/;
    return cepPattern.test(cep);
  };
