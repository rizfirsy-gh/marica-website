import axios from "axios";

export const login = (username, password) => {
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("api", { username, password }, config);
      dispatch(userLogin(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        setError(
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "Aduh ada sedikit masalah, Coba lagi yuk!"
        )
      );
    }
  };
};
