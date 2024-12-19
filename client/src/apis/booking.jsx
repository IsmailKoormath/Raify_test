import { axiosApi } from "../config/axiosConfig"

export const availableSlots = async (date) => {
    const res = await axiosApi.get(`/appointments/slots/${date}`)
    return res
}
export const bookSlot = async (data) => {
    const res = await axiosApi.post('/appointments/book', data)
    return res
}