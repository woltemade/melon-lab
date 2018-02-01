import { types } from "../actions/ranking";
import mergeReducer from "../utils/mergeReducer";

export const initialState = {
  rankingList: [],
  loading: false,
  search: "",
  ordering: "+rank",
};

export const reducer = mergeReducer(initialState, types);

export default reducer;
