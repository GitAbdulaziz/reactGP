import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice for user state management
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Stores user data if logged in; null if not
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set user data when logged in
    },
    clearUser: (state) => {
      state.user = null; // Clear user data when logged out
    },
  },
});

// Create a slice for app state, including activity
const appSlice = createSlice({
  name: "app",
  initialState: {
    selectedNeighborhood: "",
    selectedActivity: "", // New state for selected activity
    dashboardData: null,
    results: [], 
    center: { lat: 24.7136, lng: 46.6753 }, 
    populationData: null, 
    pointsOfInterest: [],
    averageIncome: null, 
  },
  reducers: {
    setSelectedNeighborhood: (state, action) => {
      state.selectedNeighborhood = action.payload;
    },
    setSelectedActivity: (state, action) => { // New reducer to handle activity selection
      state.selectedActivity = action.payload;
    },
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setCenter: (state, action) => {
      state.center = action.payload;
    },
    resetAppState: (state) => {
      state.selectedNeighborhood = "";
      state.selectedActivity = ""; // Reset activity when resetting app state
      state.dashboardData = null;
      state.results = [];
      state.center = { lat: 24.7136, lng: 46.6753 }; 
      state.populationData = null;
      state.pointsOfInterest = [];
      state.averageIncome = null;
    },
    setPopulationData: (state, action) => {
      state.populationData = action.payload;
    },
    setPointsOfInterest: (state, action) => {
      state.pointsOfInterest = action.payload;
    },
    setAverageIncome: (state, action) => {
      state.averageIncome = action.payload;
    },
    updateDashboardData: (state, action) => {
      state.dashboardData = {
        ...state.dashboardData,
        ...action.payload,
      };
    },
  },
});

// Export userSlice actions
export const { setUser, clearUser } = userSlice.actions;

// Export appSlice actions, including activity
export const {
  setSelectedNeighborhood,
  setSelectedActivity, // Exporting new action
  setDashboardData,
  setResults,
  setCenter,
  resetAppState,
  setPopulationData,
  setPointsOfInterest,
  setAverageIncome,
  updateDashboardData,
} = appSlice.actions;

// Create and export the Redux store
export const store = configureStore({
  reducer: {
    app: appSlice.reducer, // App-related reducer
    user: userSlice.reducer, // User-related reducer
  },
});
