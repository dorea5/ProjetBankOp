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
      throw new Error('Invalid credentials');
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
    const { token } = getState().user;

    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // On doit attendre la réponse JSON avant d'utiliser data
    const data = await response.json();

    // Vérification si le token a expiré
    if (response.status === 401 && data.message === "jwt expired") {
      console.log("Token expiré, redirection vers la connexion...");
      dispatch(logoutUser()); // Déconnexion
      window.location.href = "/sign-in"; // Redirection
      return Promise.reject(new Error("Token expiré"));
    }

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la récupération du profil");
    }

    return data; // Retourne les données pour Redux
  }
);






// Mettre à jour les informations utilisateur
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userName }, { getState, dispatch }) => {
    const token = getState().user.token;
    console.log("Token actuel avant update :", token); // Vérification

    if (!token) {
      throw new Error("Erreur : Aucun token trouvé. L'utilisateur doit être connecté.");
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      });

      // Si la réponse n'est pas OK (status 200)
      if (!response.ok) {
        const data = await response.json();
        // Vérification d'une erreur 401 avec message "jwt expired"
        if (response.status === 401 && data.message === "jwt expired") {
          console.log("Token expiré, déconnexion forcée !");
          dispatch(logoutUser()); // Déconnecte l'utilisateur
          return;
        }
        // Si autre erreur, lève une exception
        throw new Error(`Erreur API: ${response.status} - ${data.message}`);
      }

      // Si tout va bien, retour des données mises à jour
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      throw error; // Remonte l'erreur pour qu'elle soit capturée dans le reducer
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
        state.userData = action.payload; // Met à jour Redux après modification
      });
  },
});


export const { logout } = userSlice.actions;
export default userSlice.reducer;
