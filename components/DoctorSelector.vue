<script setup lang="ts">
import type { DoctorsCollectionItem } from '@nuxt/content';



const { locale } = useI18n()


const formStore = useFormStore()
const doctors = await queryCollection('doctors').all();
const hospitals = await queryCollection('hospitals').all();
const hospitalOptions = computed(() => {
    return hospitals.map(hospital => ({
        label: hospital.name[locale.value],
        value: hospital.id
    }));
})

const doctorOptions = computed(() => {
    const selectedDateString = formStore.selectedDate?.toISOString().split('T')[0] ?? '';
    return doctors
        .filter(doctor =>
            doctor.type === "primary" &&
            (!doctor.workingHours || doctor.workingHours.some(wh => wh.startsWith(selectedDateString)))
        )
        .map(doctor => ({
            label: doctor.name[locale.value],
            value: doctor.id,
            doctor: doctor
        }));
})

const specialistOptions = computed(() => {
    const selectedDateString = formStore.selectedDate?.toISOString().split('T')[0] ?? '';
    return doctors
        .filter(doctor =>
            doctor.type === "specialist" &&
            (!doctor.workingHours || doctor.workingHours.some(wh => wh.startsWith(selectedDateString)))
        )
        .map(doctor => ({
            label: doctor.name[locale.value],
            value: doctor.id,
            doctor: doctor
        }));
})

const specialityOptions = computed(() => {
    const selectedDateString = formStore.selectedDate?.toISOString().split('T')[0] ?? '';
    return doctors
        .filter(doctor =>
            doctor.type === "specialist" &&
            (!doctor.workingHours || doctor.workingHours.some(wh => wh.startsWith(selectedDateString)))
        )
        .map(doctor => ({
            label: doctor.speciality?.[locale.value],
            value: doctor.id,
            doctor: doctor
        }));
})

const examOptions = computed(() => {
    const selectedDateString = formStore.selectedDate?.toISOString().split('T')[0] ?? '';
    return doctors
        .filter(doctor =>
            doctor.type === "examiner" &&
            (!doctor.workingHours || doctor.workingHours.some(wh => wh.startsWith(selectedDateString)))
        )
        .map(doctor => ({
            label: doctor.exam?.[locale.value],
            value: doctor.id,
            doctor: doctor
        }));
})

const examinerOptions = computed(() => {
    const selectedDateString = formStore.selectedDate?.toISOString().split('T')[0] ?? '';
    return doctors
        .filter(doctor =>
            doctor.type === "examiner" &&
            (!doctor.workingHours || doctor.workingHours.some(wh => wh.startsWith(selectedDateString)))
        )
        .map(doctor => ({
            label: doctor.name[locale.value],
            value: doctor.id,
            doctor: doctor
        }));
})

const showAllPrimary = ref(false)
const showAllSpecialist = ref(false)
const showAllExaminer = ref(false)

const SECTION_HEIGHT = '400px'

const selectedDoctor = ref<DoctorsCollectionItem | null>(null)
const dialogVisible = ref(false)

const handleTimeSlot = (doctor: any, time: string) => {
    const appointment = {
        doctorId: doctor.id,
        doctorName: doctor.name[locale.value],
        doctorType: doctor.type,
        date: formStore.selectedDate?.toISOString().split('T')[0] ?? '',
        time: time,
        doctor: doctor
    }

    const existingIndex = formStore.selectedAppointments.findIndex(
        a => a.doctorId === doctor.id && a.time === time && a.date === appointment.date
    )

    if (existingIndex >= 0) {
        formStore.selectedAppointments.splice(existingIndex, 1)
    } else {
        formStore.selectedAppointments.push(appointment)
    }
}

const isTimeSlotSelected = (doctorId: string, time: string) => {
    return formStore.selectedAppointments.some(
        a => a.doctorId === doctorId &&
            a.time === time &&
            a.date === formStore.selectedDate?.toISOString().split('T')[0]
    )
}

const removeAppointment = (appointment: typeof formStore.selectedAppointments[0]) => {
    const index = formStore.selectedAppointments.findIndex(
        a => a.doctorId === appointment.doctorId &&
            a.time === appointment.time &&
            a.date === appointment.date
    )
    if (index >= 0) {
        formStore.selectedAppointments.splice(index, 1)
    }
}

const showDoctorDetails = (doctor: any) => {
    selectedDoctor.value = doctor
    dialogVisible.value = true
}

</script>

<template>
    <div class="w-full">

        <div class="flex flex-wrap gap-4 mt-4 justify-evenly">
            <div class="w-full md:w-1/3 lg:w-1/4">
                <FloatLabel variant="on">
                    <Select inputId="hospital" :options="hospitalOptions" fluid option-label="label"
                        option-value="value" size="large" />
                    <label for="hospital">{{ $t('hospital') }}</label>
                </FloatLabel>
            </div>
            <div class="w-full md:w-1/3 lg:w-1/4">
                <FloatLabel variant="on">
                    <Select inputId="doctor" :options="doctorOptions" fluid option-label="label" option-value="value"
                        size="large" />
                    <label for="doctor">{{ $t('primary_doctor') }}</label>
                </FloatLabel>
            </div>

            <div class="w-full md:w-1/3 lg:w-1/4">
                <FloatLabel variant="on">
                    <Select inputId="speciality" :options="specialityOptions" fluid option-label="label"
                        option-value="value" size="large" />
                    <label for="speciality">{{ $t('speciality') }}</label>
                </FloatLabel>
            </div>
            <div class="w-full md:w-1/3 lg:w-1/4">
                <FloatLabel variant="on">
                    <Select inputId="specialist" :options="specialistOptions" fluid option-label="label"
                        option-value="value" size="large" />
                    <label for="specialist">{{ $t('specialist') }}</label>
                </FloatLabel>
            </div>
            <div class="w-full md:w-1/3 lg:w-1/4">
                <FloatLabel variant="on">
                    <Select inputId="exam" :options="examOptions" fluid option-label="label" option-value="value"
                        size="large" />
                    <label for="exam">{{ $t('exam') }}</label>
                </FloatLabel>
            </div>
            <div class="w-full md:w-1/3 lg:w-1/4">
                <FloatLabel variant="on">
                    <Select inputId="examiner" :options="examinerOptions" fluid option-label="label"
                        option-value="value" size="large" />
                    <label for="examiner">{{ $t('examiner') }}</label>
                </FloatLabel>
            </div>
        </div>
        <div v-if="formStore.selectedAppointments.length > 0" class="flex flex-col gap-2 my-4">
            <div class="text-lg font-semibold">{{ $t('selected_appointments') }}</div>
            <div>
                <Chip v-for="appointment in formStore.selectedAppointments"
                    :key="`${appointment.doctorId}-${appointment.time}`"
                    :label="`${appointment.doctorName} - ${new Date(appointment.date).toLocaleDateString($i18n.locale, { day: 'numeric', month: 'short', year: 'numeric' })} ${appointment.time}`"
                    class="bg-primary-400" removable @remove="removeAppointment(appointment)" />
            </div>
        </div>
        <div class="text-lg font-semibold mt-4">{{ $t('primary_doctor') }}</div>
        <div v-if="doctorOptions.length > 0" class="mt-4 border rounded-lg shadow-md p-4 relative">
            <div class="p-4" :style="{ maxHeight: showAllPrimary ? 'none' : SECTION_HEIGHT, overflow: 'hidden' }">
                <div class="flex flex-col gap-6  mt-4" v-for="availableDoctor in doctorOptions"
                    :key="availableDoctor.doctor.id">
                    <div class="flex flex-row gap-4 items-center">
                        <div>
                            <Icon name="material-symbols:account-circle-full" class="text-7xl" />
                        </div>
                        <div>
                            <div><span class="font-semibold underline cursor-pointer"
                                    @click="showDoctorDetails(availableDoctor.doctor)">{{
                                    availableDoctor.doctor.name[locale] }}</span>
                                | <span class="text-primary-700">{{ $t('primary_doctor') }}</span></div>
                            <div class="flex flex-row gap-2 items-center mt-1">
                                <div>
                                    <Icon name="material-symbols:local-hospital-outline" class="text-3xl" />
                                </div>
                                <div>
                                    <div class="text-muted-color">{{ availableDoctor.doctor.hospital.name[locale] }}
                                    </div>
                                    <div class="text-muted-color">{{ availableDoctor.doctor.hospital.address[locale] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <template v-for="hour in 6" :key="hour">
                            <template v-for="minute in ['00', '20', '40']" :key="minute">
                                <Chip :label="`${(hour + 8).toString().padStart(2, '0')}:${minute} - ${minute === '40'
                                    ? `${(hour + 9).toString().padStart(2, '0')}:00`
                                    : `${(hour + 8).toString().padStart(2, '0')}:${(parseInt(minute) + 20).toString().padStart(2, '0')}`
                                    }`" class="cursor-pointer w-[140px] text-center" :class="{
                                        'bg-primary-500': isTimeSlotSelected(availableDoctor.doctor.id, `${(hour + 8).toString().padStart(2, '0')}:${minute}`),
                                        'hover:bg-primary-100': !isTimeSlotSelected(availableDoctor.doctor.id, `${(hour + 8).toString().padStart(2, '0')}:${minute}`)
                                    }"
                                    @click="handleTimeSlot(availableDoctor.doctor, `${(hour + 8).toString().padStart(2, '0')}:${minute}`)" />
                            </template>
                        </template>
                    </div>
                </div>
            </div>
            <button v-if="doctorOptions.length > 1" @click="showAllPrimary = !showAllPrimary"
                class="w-full text-center py-2 text-primary-700 hover:text-primary-800 border-t">
                {{ showAllPrimary ? $t('show_less') : $t('show_more') }}
            </button>
        </div>
        <div class="text-lg font-semibold mt-4">{{ $t('specialist') }}</div>

        <div v-if="specialistOptions.length > 0" class="mt-4 border rounded-lg shadow-md p-4 relative">
            <div class="p-4" :style="{ maxHeight: showAllSpecialist ? 'none' : SECTION_HEIGHT, overflow: 'hidden' }">
                <div class="flex flex-col gap-6  mt-4" v-for="availableDoctor in specialistOptions"
                    :key="availableDoctor.doctor.id">
                    <div class="flex flex-row gap-4 items-center">
                        <div>
                            <Icon name="material-symbols:account-circle-full" class="text-7xl" />
                        </div>
                        <div>
                            <div><span class="font-semibold underline cursor-pointer"
                                    @click="showDoctorDetails(availableDoctor.doctor)">{{
                                    availableDoctor.doctor.name[locale]
                                    }}</span>
                                | <span class="text-primary-700">{{ availableDoctor.doctor.speciality?.[locale]
                                    }}</span></div>
                            <div class="flex flex-row gap-2 items-center mt-1">
                                <div>
                                    <Icon name="material-symbols:local-hospital-outline" class="text-3xl" />
                                </div>
                                <div>
                                    <div class="text-muted-color">{{ availableDoctor.doctor.hospital.name[locale] }}
                                    </div>
                                    <div class="text-muted-color">{{ availableDoctor.doctor.hospital.address[locale] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <template v-for="hour in 6" :key="hour">
                            <template v-for="minute in ['00', '20', '40']" :key="minute">
                                <Chip :label="`${(hour + 8).toString().padStart(2, '0')}:${minute} - ${minute === '40'
                                    ? `${(hour + 9).toString().padStart(2, '0')}:00`
                                    : `${(hour + 8).toString().padStart(2, '0')}:${(parseInt(minute) + 20).toString().padStart(2, '0')}`
                                    }`" class="cursor-pointer w-[140px] text-center" :class="{
                                        'bg-primary-100': isTimeSlotSelected(availableDoctor.doctor.id, `${(hour + 8).toString().padStart(2, '0')}:${minute}`),
                                        'hover:bg-primary-100': !isTimeSlotSelected(availableDoctor.doctor.id, `${(hour + 8).toString().padStart(2, '0')}:${minute}`)
                                    }"
                                    @click="handleTimeSlot(availableDoctor.doctor, `${(hour + 8).toString().padStart(2, '0')}:${minute}`)" />
                            </template>
                        </template>
                    </div>
                </div>
            </div>
            <button v-if="specialistOptions.length > 1" @click="showAllSpecialist = !showAllSpecialist"
                class="w-full text-center py-2 text-primary-700 hover:text-primary-800 border-t">
                {{ showAllSpecialist ? $t('show_less') : $t('show_more') }}
            </button>
        </div>
        <div class="text-lg font-semibold mt-4">{{ $t('examiner') }}</div>
        <div v-if="examinerOptions.length > 0" class="mt-4 border rounded-lg shadow-md p-4 relative">
            <div class="p-4" :style="{ maxHeight: showAllExaminer ? 'none' : SECTION_HEIGHT, overflow: 'hidden' }">
                <div class="flex flex-col gap-6  mt-4" v-for="availableDoctor in examinerOptions"
                    :key="availableDoctor.doctor.id">
                    <div class="flex flex-row gap-4 items-center">
                        <div>
                            <Icon name="material-symbols:account-circle-full" class="text-7xl" />
                        </div>
                        <div>
                            <div><span class="font-semibold underline cursor-pointer"
                                    @click="showDoctorDetails(availableDoctor.doctor)">{{
                                    availableDoctor.doctor.name[locale]
                                    }}</span>
                                | <span class="text-primary-700">{{ availableDoctor.doctor.exam?.[locale] }}</span>
                            </div>
                            <div class="flex flex-row gap-2 items-center mt-1">
                                <div>
                                    <Icon name="material-symbols:local-hospital-outline" class="text-3xl" />
                                </div>
                                <div>
                                    <div class="text-muted-color">{{ availableDoctor.doctor.hospital.name[locale] }}
                                    </div>
                                    <div class="text-muted-color">{{ availableDoctor.doctor.hospital.address[locale] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <template v-for="hour in 6" :key="hour">
                            <template v-for="minute in ['00', '20', '40']" :key="minute">
                                <Chip :label="`${(hour + 8).toString().padStart(2, '0')}:${minute} - ${minute === '40'
                                    ? `${(hour + 9).toString().padStart(2, '0')}:00`
                                    : `${(hour + 8).toString().padStart(2, '0')}:${(parseInt(minute) + 20).toString().padStart(2, '0')}`
                                    }`" class="cursor-pointer w-[140px] text-center" :class="{
                                        'bg-primary-100': isTimeSlotSelected(availableDoctor.doctor.id, `${(hour + 8).toString().padStart(2, '0')}:${minute}`),
                                        'hover:bg-primary-100': !isTimeSlotSelected(availableDoctor.doctor.id, `${(hour + 8).toString().padStart(2, '0')}:${minute}`)
                                    }"
                                    @click="handleTimeSlot(availableDoctor.doctor, `${(hour + 8).toString().padStart(2, '0')}:${minute}`)" />
                            </template>
                        </template>
                    </div>
                </div>
            </div>
            <button v-if="examinerOptions.length > 1" @click="showAllExaminer = !showAllExaminer"
                class="w-full text-center py-2 text-primary-700 hover:text-primary-800 border-t">
                {{ showAllExaminer ? $t('show_less') : $t('show_more') }}
            </button>
        </div>

        <Dialog v-model:visible="dialogVisible" modal :header="$t('doctor_details')" :style="{ width: '30rem' }"
            v-if="selectedDoctor">
            <template #header>
                <div class="flex flex-col">
                    <div class="text-lg font-semibold">{{ $t('doctor_details') }}</div>
                    <div class="w-full">
                        <Divider class="w-full"></Divider>
                    </div>

                </div>
            </template>
            <div class="flex items-center gap-2">
                <div>
                    <Icon name="material-symbols:account-circle-full" class="text-6xl" />

                </div>
                <div>
                    <span class="font-bold whitespace-nowrap text-lg">{{ selectedDoctor?.name[locale] }}</span>
                    <div class="flex items-center gap-2">
                        <Icon name="material-symbols:local-hospital-outline" class="text-3xl" />
                        <div>
                            <div>{{ selectedDoctor?.hospital.name[locale] }}</div>
                            <div class="text-muted-color">{{ selectedDoctor?.hospital.address[locale] }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4 mt-4">
                <div v-if="selectedDoctor?.description">
                    <span class="font-semibold">{{ $t('description') }}:</span>
                    {{ selectedDoctor?.description[locale] }}
                </div>
                <div v-if="selectedDoctor?.speciality">
                    <span class="font-semibold">{{ $t('speciality') }}:</span>
                    {{ selectedDoctor?.speciality[locale] }}
                </div>
                <div v-if="selectedDoctor?.exam">
                    <span class="font-semibold">{{ $t('exam') }}:</span>
                    {{ selectedDoctor?.exam[locale] }}
                </div>
            </div>
        </Dialog>
    </div>
</template>