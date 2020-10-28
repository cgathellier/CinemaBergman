import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [
    // {
    //     message: 'Les mots de passes ne correspondent pas',
    //     alertType: 'danger',
    //     id: 4,
    // },
];

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            const findAlert = state.filter(alert => alert.message === payload.message);
            if (findAlert.length > 0) {
                return state;
            }
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}
