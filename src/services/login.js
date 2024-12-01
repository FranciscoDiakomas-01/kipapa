export async function login(body) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`http://localhost:8080/login`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
        body: JSON.stringify(body),
      method : 'POST'
    });
      const response = await API.json();
      
    if (response?.token) {
      return response
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}


export async function singin(body) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`http://localhost:8080/client`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(body),
      method: "POST",
    });
    const response = await API.json();
    console.log(response)
    if (response?.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}
