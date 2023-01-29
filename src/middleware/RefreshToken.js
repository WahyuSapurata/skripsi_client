import axios from "axios";
import jwtDecode from "jwt-decode";

const refreshToken = async () => {
  try {
    const session = sessionStorage.getItem("auth");
    const decoded = jwtDecode(session);
    console.log(decoded);
    sessionStorage.setItem("nama_pengguna", decoded.nama_pengguna);
    sessionStorage.setItem("email_pengguna", decoded.email_pengguna);
    await axios.get("http://localhost:3100/token", {
      headers: { Authorization: `Bearer ${session}` },
    });
  } catch (error) {
    throw error;
  }
};
export default refreshToken;
