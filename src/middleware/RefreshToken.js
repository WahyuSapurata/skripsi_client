import axios from "axios";
import jwtDecode from "jwt-decode";

const refreshToken = async () => {
  try {
    const session = sessionStorage.getItem("auth");
    const decoded = jwtDecode(session);
    sessionStorage.setItem("userId", decoded.userId);
    sessionStorage.setItem("nama_pengguna", decoded.nama_pengguna);
    sessionStorage.setItem("email_pengguna", decoded.email_pengguna);
    sessionStorage.setItem("name_bisnis", decoded.name_bisnis);
    sessionStorage.setItem("alamat_bisnis", decoded.alamat_bisnis);
    sessionStorage.setItem("nomor_pengguna", decoded.nomor_pengguna);
    sessionStorage.setItem("url", decoded.url);
    await axios.get("http://localhost:3100/token", {
      headers: { Authorization: `Bearer ${session}` },
    });
  } catch (error) {
    throw error;
  }
};
export default refreshToken;
