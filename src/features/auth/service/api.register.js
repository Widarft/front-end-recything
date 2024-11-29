import instance from "../../../utils/instance.js";

export async function apiRegister({nama_lengkap, tanggal_lahir, no_telepon, email, password}) {
 try {
   const response = await instance.post('/register', {nama_lengkap, tanggal_lahir, no_telepon, email, password})
   return response.data;
 } catch (error) {
   throw new Error("Error registering user.");
 }
}
