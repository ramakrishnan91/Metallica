/*
import { AUTHENTICATE_USER } from './Actions';
 * action types
 */

export const SET_SELECTED_TRADE = 'SET_SELECTED_TRADE';
export const SET_IS_EDITING = 'SET_IS_EDITING';
export const SET_COMMODITIES = 'SET_COMMODITIES';
export const SET_COUNTERPARTIES = 'SET_COUNTERPARTIES';
export const SET_LOCATIONS  = 'SET_LOCATIONS';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const DELETE_TRADE = 'DELETE_TRADE';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

/*
 * action creators
 */

export function setEditingState(isEditing) {
    return {type: SET_IS_EDITING, isEditing}
}
export function setCommodities(commodities) {
    return {type: SET_COMMODITIES, commodities}
}
export function setCounterparties(counterparties) {
    return {type: SET_COUNTERPARTIES, counterparties}
}
export function setLocations(locations) {
    return {type: SET_LOCATIONS, locations}
}
export function setSelectedTrade(selectedTrade) {
    return {type: SET_SELECTED_TRADE, selectedTrade}
}
export function setProducts(products) {
    return {type: SET_PRODUCTS, products}
}
export function updateProducts(editedTrade) {
    return {type: UPDATE_PRODUCTS, editedTrade}
}
export function deleteTrade(deletedTrade) {
    return {type: DELETE_TRADE, deletedTrade}
}
export function isAuthenticatedUser(authenticatedUser) {
    return {type: AUTHENTICATE_USER, authenticatedUser}
}

