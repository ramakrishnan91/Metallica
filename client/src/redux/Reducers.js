import {
  SET_SELECTED_TRADE,
  SET_PRODUCTS,
  UPDATE_PRODUCTS,
  SET_IS_EDITING,
  SET_COMMODITIES,
  SET_COUNTERPARTIES,
  SET_LOCATIONS,
  DELETE_TRADE,
  AUTHENTICATE_USER
} from "./Actions";

const initialState = {
  selectedTrade: {},
  products: [],
  commodities: [],
  counterparties: [],
  locations: []
};

export default function metallicaReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case AUTHENTICATE_USER:
      return Object.assign({}, state, {
        isAuthenticatedUser: action.authenticatedUser
      });
    case SET_IS_EDITING:
      return Object.assign({}, state, {
        isEditing: action.isEditing
      });
    case SET_COMMODITIES:
      newState = Object.assign({}, state, {
        commodities: action.commodities
      });
      return newState;
    case SET_COUNTERPARTIES:
      newState = Object.assign({}, state, {
        counterparties: action.counterparties
      });
      return newState;
    case SET_LOCATIONS:
      newState = Object.assign({}, state, {
        locations: action.locations
      });
      return newState;
    case SET_SELECTED_TRADE:
      newState = Object.assign({}, state, {
        selectedTrade: action.selectedTrade
      });
      return newState;
    case SET_PRODUCTS:
      newState = Object.assign({}, state, {
        products: action.products
      });
      return newState;
    case UPDATE_PRODUCTS:
      let newTrade = true;
      let newProducts = state.products.map(item => {
        if (item.id === action.editedTrade.id) {
          newTrade = false;
          return action.editedTrade;
        }
        return item;
      });
      if (newTrade) {
        newProducts.push(action.editedTrade);
      }
      return Object.assign({}, state, { products: newProducts });
    case DELETE_TRADE:
      let updatedProducts = state.products.filter(element => {
        return element.id !== action.deletedTrade.id;
      });
      return Object.assign({}, state, { products: updatedProducts });
    default:
      return state;
  }
}
