import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const initialState = {
    displayModal: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                displayModal: true,
            };
        case HIDE_MODAL:
            return {
                ...state,
                displayModal: false,
            };
        default:
            return state;
    }
}
