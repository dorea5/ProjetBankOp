import { createSlice, createAsyncThunk , createAction} from '@reduxjs/toolkit';

// Authentification de l'utilisateur
export const loginUser = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      if (errorData && errorData.message) {
        return rejectWithValue(errorData.message); // Reject with server message
      } else {
        return rejectWithValue("Erreur de connexion.")
      }
    }

    const data = await response.json();
    localStorage.setItem('token', data.body.token); // Stocke token
    return data.body.token;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Récupérer les informations utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { dispatch, getState }) => {
    const { token } = getState().user;   //recupère le token depuis redux

    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,   
      },
    });

    // On doit attendre la réponse JSON avant d'utiliser data
    const data = await response.json();
    
    // Vérification si le token a expiré
    if (response.status === 401 && data.message === "jwt expired") {
     
      dispatch(logoutUser()); // Déconnexion
      window.location.href = "/sign-in"; // Redirection
      return Promise.reject(new Error("Token expiré"));
    }

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la récupération du profil");
    }

    return data.body; // Retourne les données du profil utilisateur
  }
);






// Mettre à jour les informations utilisateur
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userName }, { getState, dispatch, rejectWithValue }) => {
    const token = getState().user.token;
    if (!token) return rejectWithValue("Utilisateur non authentifié");

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }), //envoi du nouveau nom utilisateur au serveur grace a put
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 && data.message === 'jwt expired') {
          console.warn('Token expiré, déconnexion forcée !');
          dispatch(logoutUser());
          return rejectWithValue('Session expirée, veuillez vous reconnecter.');
        }
        return rejectWithValue(data.message || 'Erreur de mise à jour');
      }

      if (!data.body) {
        return rejectWithValue("Réponse API invalide : aucun body retourné");
      }

      return data.body; // Redux reçoit les données du profil maj
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur réseau');
    }
  }
);

export const logoutUser = createAction("user/logout");


const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token') || null, // Charge le token au démarrage
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem('token');
    },
      resetError: (state) => {
        state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(logoutUser, (state) => {
        state.token = null;
        localStorage.removeItem("token"); // Supprime le token du stockage
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userData = action.payload;}) // Met à jour Redux après modification
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload
      });
  },
});


export const { logout } = userSlice.actions;
export default userSlice.reducer;
export const { resetError } = userSlice.actions;
