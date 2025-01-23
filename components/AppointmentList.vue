<script setup lang="ts">


const { locale, t: $t } = useI18n()

const props = defineProps<{
    activateCallback: (step: string) => void
}>()

const formStore = useFormStore()

const getDoctorTypeLabel = (appointment: Appointment) => {
    if (appointment.doctor?.speciality) {
        return appointment.doctor.speciality[locale.value]
    }
    if (appointment.doctor?.exam) {
        return appointment.doctor.exam[locale.value]
    }
    return appointment.doctorType === 'primary' ?
        'primary_doctor' :
        appointment.doctorType
}

const confirm = useConfirm();
const toast = useToast();

const bookAppointments = () => {
    confirm.require({
        message: $t('confirm_booking'),
        header: $t('confirm_booking_header'),
        acceptClass: 'p-button-danger',
        acceptLabel: $t('confirm_booking_accept_label'),
        rejectLabel: $t('confirm_booking_reject_label'),
        accept: () => {
            toast.add({ severity: 'success', summary: $t('success'), detail: $t('appointment_booked'), life: 3000 });
        },
    });
}
</script>

<template>
    <div class="flex flex-col gap-4">

        <div class="text-2xl font-semibold">{{ $t('check_appointments') }}</div>
        <div v-for="appointment in formStore.selectedAppointments" :key="`${appointment.doctorId}-${appointment.time}`"
            class="border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start">
                <div class="flex gap-4">
                    <Icon name="material-symbols:account-circle-full" class="text-5xl text-primary-600" />
                    <div>
                        <div class="font-semibold text-lg">{{ appointment.doctorName }}</div>
                        <div class="text-primary-700">{{ $t(getDoctorTypeLabel(appointment)) }}</div>
                        <div class="flex items-center gap-2 mt-2 text-gray-600">
                            <Icon name="material-symbols:calendar-month" class="text-2xl" />
                            <span>{{ new Date(appointment.date).toLocaleDateString(locale, {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-gray-600 mt-2">
                            <Icon name="material-symbols:schedule" class="text-2xl" />
                            <span>{{ appointment.time }}</span>
                        </div>
                        <div v-if="appointment.doctor?.hospital" class="flex items-center gap-2 mt-2 text-gray-600">
                            <Icon name="material-symbols:local-hospital-outline" class="mt-1 text-2xl" />
                            <div>
                                <div>{{ appointment.doctor.hospital.name[locale] }}</div>
                                <div>{{ appointment.doctor.hospital.address[locale] }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" />
            </div>
        </div>
        <Button @click="bookAppointments()">{{ $t('book_appointment') }}</Button>
    </div>
</template>