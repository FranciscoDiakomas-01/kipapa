
export async function getAllPayForm() {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`http://localhost:8080/payform`, {
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