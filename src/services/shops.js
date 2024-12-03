export async function getMyOrders(page = 1, limit = 10) {
    
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("uid");
  try {
    const API = await fetch(
      `https://kipapa-backend.onrender.com/clientOrder/${id}?page=${page}&limit=${limit}`,
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
