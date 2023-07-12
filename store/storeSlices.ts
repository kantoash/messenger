
import { CallType } from '@/app/types';
import { User } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CounterState {
    VIDEO_CALL: CallType;
    VOICE_CALL: CallType;
    INCOMING_VIDEO_CALL: CallType;
    INCOMING_VOICE_CALL: CallType;
}

const initialState: CounterState = {
    VIDEO_CALL: undefined,
    VOICE_CALL: undefined,
    INCOMING_VIDEO_CALL: undefined,
    INCOMING_VOICE_CALL: undefined,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        SET_VIDEO_CALL: (state, action: PayloadAction<CallType>) => {
            state.VIDEO_CALL = action.payload;
        },
        SET_VOICE_CALL: (state, action: PayloadAction<CallType>) => {
            state.VOICE_CALL = action.payload;
        },
        SET_END_CALL: (state, action) => {
            state.VIDEO_CALL = undefined;
            state.VOICE_CALL = undefined;
            state.INCOMING_VIDEO_CALL = undefined;
            state.INCOMING_VOICE_CALL = undefined;
        },
        SET_INCOMING_VIDEO_CALL: (state, action: PayloadAction<CallType>) => {
            state.INCOMING_VIDEO_CALL = action.payload;
        },
        SET_INCOMING_VOICE_CALL: (state, action: PayloadAction<CallType>) => {
            state.INCOMING_VOICE_CALL = action.payload;
        },
    }
})

export const {
    SET_VIDEO_CALL,
    SET_VOICE_CALL,
    SET_END_CALL,
    SET_INCOMING_VIDEO_CALL,
    SET_INCOMING_VOICE_CALL,
} = counterSlice.actions;

export default counterSlice.reducer;