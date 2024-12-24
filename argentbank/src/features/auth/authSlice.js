import { apiUrl } from "../../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// connexion utilisateur avec enregistrement token dans le state redux avec persist
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, userData);
      const token = response.data.body.token;
      return { ...response.data, token };
    } catch (error) {
      console.log("API error:", error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, reset } = authSlice.actions;

export default authSlice.reducer;

// L'utilisateur soumet ses identifiants.
//  loginUser est déclenchée :
//  Envoie une requête POST à l'API.
//  En cas de succès :
//    Extrait le token de la réponse.
//    Met à jour l'état Redux avec les informations utilisateur et le token.
//  En cas d'erreur :
//    Capture et stocke les détails de l'erreur dans error.