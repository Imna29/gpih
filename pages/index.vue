<script lang="ts" setup>
import { useFormStore } from '~/stores/formState'

const localePath = useLocalePath()
const formStore = useFormStore()

const holders = await queryCollection('holders').all()

const handlePolicyNumberEnter = (event: KeyboardEvent) => {
    const policyNumber = (event.target as HTMLInputElement).value
    const matchingHolder = holders.find(holder => holder.policyNumber === policyNumber)
    if (matchingHolder) {
        formStore.setSelectedHolder(matchingHolder.id)
    }
}

const handleSomeoneElseSearch = () => {
    if (!formStore.personalNumber || !formStore.dateOfBirth) return

    const date = formStore.dateOfBirth?.getFullYear() + '-' +
        String(formStore.dateOfBirth?.getMonth() + 1).padStart(2, '0') + '-' +
        formStore.dateOfBirth?.getDate()
    const matchingHolder = holders.find(holder =>
        holder.personalNumber === formStore.personalNumber &&
        holder.dateOfBirth === date
    )

    if (matchingHolder) {
        formStore.setSelectedHolder(matchingHolder.id)
    }
}

const handlePersonalEnter = (event: KeyboardEvent) => {
    if (formStore.dateOfBirth) {
        handleSomeoneElseSearch()
    }
}
</script>

<template>
    <div class="container mx-auto">
        <div class="card w-full  md:w-5/6 mt-10 mx-auto">
            <Stepper value="1">
                <StepList>
                    <Step value="1"></Step>
                    <Step value="2" :disabled="formStore.selectedHolder === null"></Step>
                    <Step value="3" :disabled="formStore.selectedHolder === null"></Step>
                    <Step value="4" :disabled="formStore.doctorType.length === 0"></Step>
                    <Step value="5" :disabled="formStore.selectedHospital === null"></Step>
                    <Step value="6" :disabled="formStore.selectedAppointments.length === 0"></Step>
                </StepList>
                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <SelectHolder :activate-callback="activateCallback" />
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <SelectVisitType :activate-callback="activateCallback" />
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <SelectDoctorType :activate-callback="activateCallback" />
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="4">
                        <SelectHospital :activate-callback="activateCallback" />
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="5">
                        <SelectDoctor :activate-callback="activateCallback" />
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="6">
                        <AppointmentList :activate-callback="activateCallback" />
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
</template>
