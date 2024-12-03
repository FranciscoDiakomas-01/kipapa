
export async function getAllPayForm() {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`https://kipapa-backend.onrender.com/payform`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
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