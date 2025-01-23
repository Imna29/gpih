import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Appointment {
    doctorId: string
    doctorName: string
    doctorType: string
    date: string
    time: string
    doctor?: {
        hospital: {
            name: Record<string, string>
            address: Record<string, string>
        }
        speciality?: Record<string, string>
        exam?: Record<string, string>
    }
}

export const useFormStore = defineStore('form', () => {
    const forWho = ref<'me' | 'someone_else'>('me')
    const selectedHolder = ref<string | null>(null)
    const personalNumber = ref('')
    const dateOfBirth = ref<Date | null>(null)
    const visitType = ref<'phone' | 'hospital' | 'video'>('phone')
    const doctorType = ref<('primary_doctor' | 'specialist' | 'instrumental')[]>([])
    const selectedHospital = ref<string | null>(null)
    const selectedDate = ref<Date | null>(null)
    const selectedAppointments = ref<Appointment[]>([])


    const setForWho = (value: 'me' | 'someone_else') => {
        forWho.value = value
    }

    const setSelectedHolder = (holder: string | null) => {
        selectedHolder.value = holder
    }

    const setPersonalNumber = (value: string) => {
        personalNumber.value = value
    }

    const setDateOfBirth = (date: Date | null) => {
        dateOfBirth.value = date
    }

    const setSelectedDate = (date: Date | null) => {
        selectedDate.value = date
    }

    const reset = () => {
        forWho.value = 'me'
        selectedHolder.value = null
        personalNumber.value = ''
        dateOfBirth.value = null
    }

    return {
        // state
        forWho,
        selectedHolder,
        personalNumber,
        dateOfBirth,
        selectedHospital,
        visitType,
        doctorType,
        selectedAppointments,
        selectedDate,
        // actions
        setForWho,
        setSelectedHolder,
        setPersonalNumber,
        setDateOfBirth,
        setSelectedDate,
        reset
    }
})
