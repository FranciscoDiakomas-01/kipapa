export async function getById(id) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(
      `http://localhost:8080/foodcategorys?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    const response = await API.json();
    if (Array.isArray(response?.data)) {
      return response?.data[0];
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}
export async function getAll(page = 1, limit = 10) {
  const token = localStorage.getItem("token");
    try {
      const API = await fetch(`http://localhost:8080/foodcategorys?page=${page}&limit=${limit}`, {
        headers: {
          "Content-Type": "application/json",
          "authorization" : token
        },
      });
      const response = await API.json();
      if (response?.data?.length > 0) {
        return response;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
}
export async function deleteById(id) {
const token = localStorage.getItem("token");
  try {
      if (isNaN(id)) {
        return false;
      }
      const API = await fetch(`http://localhost:8080/foodcategory/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        method : 'DELETE'
      });
      const response = await API.json();
        if (response?.data == "not found") {
          return false;
        } else {
          return true;
        }
    } catch (error) {
      return error;
    }
}

export async function create(category) {
  const token = localStorage.getItem("token");
  try {
    if (!category) {
      return false;
    }
    const API = await fetch(`http://localhost:8080/foodcategory`, {
      headers: {
        authorization: token,
      },
      method: "POST",
      body : category
    });
    const response = await API.json();
    if (response?.data == "created") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export async function update(category) {
  const token = localStorage.getItem("token");
  try {
    if (!category) {
      return false;
    }
    const id = sessionStorage.getItem("cid");
    const API = await fetch(`http://localhost:8080/foodcategory/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      method: "PUT",
      body: JSON.stringify(category),
    });
    const response = await API.json();
    if (response?.data == "updated") {
      return true
    } else {
      return false
    }
  } catch (error) {
    return error;
  }
}
