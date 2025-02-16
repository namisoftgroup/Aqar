import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category_id: "",
  city_id: "",
  user_id: "",
  adult_number: "",
  children_number: "",
  baby_number: "",
  with_pits: "",
  area_id: "",
  from_date: "",
  to_date: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      return { ...state, ...action.payload };
    },
    resetFilter() {
      return initialState;
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
