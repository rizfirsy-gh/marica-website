import axios from "axios";
import {
  userLogin,
  userLogout,
  setError,
  setLoading,
  setStatus,
} from "../slices/user";

const apiRoute = "https://marica-backend.vercel.app/api/v1";

export const addKid =
  ({ firstname, lastname, birthdate }) =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const { data, status } = await axios.post(
        `${apiRoute}/user/anak`,
        {
          nama: `${firstname} ${lastname}`,
          lahir: birthdate,
        },
        config
      );

      dispatch(setStatus(data));
    } catch (error) {
      dispatch(setStatus(error.response.status));
      dispatch(
        setError(
          error.message && error.response
            ? error.response
            : error.message
            ? error.message
            : "Aduh ada sedikit masalah, Coba lagi yuk!"
        )
      );
    }
  };

export const selectKid = (childId) => async (dispatch) => {
  //1. loading
  dispatch(setLoading(true));

  try {
    //2. get child data
    const { data, status, statusText } = await axios.get(
      `${apiRoute}/user/anak?idAnak=${childId}`
    );

    //3. store the child data and token to redux & local storage
    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("token", JSON.stringify(data.data.token));
  } catch (error) {
    dispatch(setStatus(error.response.status));
    dispatch(
      setError(
        error.message && error.response
          ? error.response
          : error.message
          ? error.message
          : "Aduh ada sedikit masalah, Coba lagi yuk!"
      )
    );
  }
};

export const deleteKid = (childId) => async (dispatch) => {
  //1. loading
  dispatch(setLoading(true));

  try {
    //2. get child data
    await axios.delete(`${apiRoute}/user/anak`);
  } catch (error) {
    dispatch(setStatus(error.response.status));
    dispatch(
      setError(
        error.message && error.response
          ? error.response
          : error.message
          ? error.message
          : "Aduh ada sedikit masalah, Coba lagi yuk!"
      )
    );
  }
};
