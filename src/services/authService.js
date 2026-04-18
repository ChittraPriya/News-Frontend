import instance from "../instances/instances"


export const registerUser  = async(userData) =>{
    const response = await instance.post('/auth/register', userData);
    return response.data
};
export const loginUser = async (userData) => {
  const response = await instance.post("/auth/login", userData);
  return response.data;
};

export const savePreference = async (data) => {
  const response = await instance.post("/preferences", data);
  return response.data;
};