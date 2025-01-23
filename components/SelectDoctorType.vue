<script lang="ts" setup>
defineProps<{
    activateCallback: (step: string) => void
}>()

const formStore = useFormStore()
</script>

<template>
    <div class="w-full md:w-1/2 mx-auto flex flex-col">
        <div class="text-2xl my-4 font-semibold mx-auto">{{ $t('doctor_type_title') }}</div>
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4 border-2 p-4 rounded-md">
                <Checkbox value="primary_doctor" v-model="formStore.doctorType" name="doctor_type" class="" />
                <label for="doctor_type" class="text-lg font-semibold">{{ $t('primary_doctor_consultation') }}</label>
            </div>
            <div class="flex items-center gap-4 border-2 p-4 rounded-md">
                <Checkbox value="specialist" v-model="formStore.doctorType" name="doctor_type" class="" />
                <label for="doctor_type" class="text-lg font-semibold">{{ $t('specialist_consultation') }}</label>
            </div>
            <div class="flex items-center gap-4 border-2 p-4 rounded-md">
                <Checkbox value="instrumental" v-model="formStore.doctorType" name="doctor_type" class="" />
                <div>
                    <label for="doctor_type" class="text-lg font-semibold">{{ $t('instrumental_consultation') }}</label>
                    <div class="text-sm text-muted-color">{{ $t('instrumental_consultation_description') }}</div>
                </div>
            </div>
        </div>
        <Message severity="secondary" class="mt-10">
            <template #icon>
                <Icon name="material-symbols:info-outline-rounded" class="text-4xl" />
            </template>
            {{ $t('curatio_only') }}
        </Message>
        <div class="mt-4 flex justify-between">
            <Button severity="secondary" @click="activateCallback('2')" size="large">
                <Icon name="material-symbols:arrow-back" />
                {{ $t('back') }}
            </Button>
            <Button size="large" :disabled="formStore.doctorType.length === 0" @click="activateCallback('4')">
                {{ $t('continue') }}
            </Button>
        </div>
    </div>
</template>