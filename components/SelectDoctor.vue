<script setup lang="ts">

defineProps<{
    activateCallback: (step: string) => void
}>()

const formStore = useFormStore()


</script>

<template>
    <div class="w-full md:w-5/6 mx-auto">
        <div class="text-2xl my-4 font-semibold mx-auto text-center">{{ $t('select_doctor_title') }}</div>
        <DateSelector v-model:selectedDate="formStore.selectedDate" />
        <DoctorSelector />
        <div class="mt-4 flex justify-between">
            <Button severity="secondary" @click="activateCallback('4')" size="large">
                <Icon name="material-symbols:arrow-back" />
                {{ $t('back') }}
            </Button>
            <Button :disabled="formStore.selectedAppointments.length === 0" size="large"
                @click="activateCallback('6')">
                {{ $t('continue') }}
            </Button>
        </div>
    </div>
</template>