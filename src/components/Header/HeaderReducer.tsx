import Immutable from "seamless-immutable";
import { HEADER_ACTIONS } from "./HeaderAction";

interface HeaderState {
    searchQuery: string;
    commandPaletteOpen: boolean;
}

interface HeaderAction {
    type?: string;
    payload?: string | boolean;
}

const initialState = Immutable({
    searchQuery: "",
    commandPaletteOpen: false
}) as unknown as HeaderState;

export default (state: HeaderState = initialState, { type, payload }: HeaderAction = {}): HeaderState => {
    switch (type) {
        case HEADER_ACTIONS.HANDLE_SEARCH:
            return { ...state, searchQuery: typeof payload === "string" ? payload : "" };
        case HEADER_ACTIONS.TOGGLE_COMMAND_PALETTE:
            return { ...state, commandPaletteOpen: !state.commandPaletteOpen };
        case HEADER_ACTIONS.CLOSE_COMMAND_PALETTE:
            return { ...state, commandPaletteOpen: false };
        default:
            return state;
    }
};
