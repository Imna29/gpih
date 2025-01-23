<script setup lang="ts">


defineProps<{
    activateCallback: (step: string) => void
}>()

const formStore = useFormStore()
const hospitalSearch = ref('')
const hospitals = await queryCollection('hospitals').all();
const cities = ref([...new Set(hospitals.map(hospital => hospital.city))].map(city => ({
    name: city
})));

const filteredHospitals = computed(() => {
    if (!hospitalSearch.value) {
        return hospitals
    }
    return hospitals.filter(hospital => {
        const searchTerm = hospitalSearch.value.toLowerCase()
        return Object.values(hospital.name).some(name =>
            name.toLowerCase().includes(searchTerm)
        )
    })
})

</script>

<template>
    <div class="w-full md:w-1/2 mx-auto flex flex-col">
        <div class="text-2xl my-4 font-semibold mx-auto">{{ $t('select_hospital_title') }}</div>
        <FloatLabel class="w-full my-4" variant="on">
            <Select inputId="select_city" :options="cities" optionLabel="name" option-value="name"
                default-value="Tbilisi" class="w-full" fluid size="large" />
            <label for="select_city">{{ $t('select_city') }}</label>
        </FloatLabel>
        <div class="mt-2">
            {{ $t('select_desired_hospital') }}
        </div>
        <FloatLabel variant="on" class="my-4">
            <IconField>
                <InputIcon>
                    <Icon name="material-symbols:search" />
                </InputIcon>
                <InputText id="hospital_search" v-model="hospitalSearch" autocomplete="off" fluid size="large" />
            </IconField>
            <label for="hospital_search">{{ $t('search_hospital') }}</label>
        </FloatLabel>
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4 border-2 p-4 rounded-md" v-for="hospital in filteredHospitals"
                :key="hospital.id">
                <div class="flex items-center justify-center bg-surface-200 p-2 rounded-md">
                    <Avatar :image="hospital.icon" class="mr-2" size="xlarge" shape="circle" />
                </div>
                <label class="text-lg font-semibold">{{ hospital.name[$i18n.locale] }}</label>
                <RadioButton :value="hospital.id" v-model="formStore.selectedHospital" class="ml-auto" />
            </div>
        </div>
        <div class="mt-4 flex justify-between">
            <Button severity="secondary" @click="activateCallback('3')" size="large">
                <Icon name="material-symbols:arrow-back" />
                {{ $t('back') }}
            </Button>
            <Button size="large" :disabled="formStore.selectedHospital === null" @click="activateCallback('5')">
                {{ $t('continue') }}
            </Button>
        </div>
    </div>
</template>