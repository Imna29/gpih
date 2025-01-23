<script lang="ts" setup>
import { useFormStore } from '~/stores/formState'

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

defineProps<{
    activateCallback: (step: string) => void
}>()
</script>

<template>
    <div class="w-full md:w-1/2 mx-auto flex flex-col">
        <div class="text-2xl my-4 font-semibold mx-auto">{{ $t('choose_the_person_title') }}</div>
        <div class="grid grid-cols-2 gap-4 ">
            <div class="flex items-center gap-2 border-2 p-4 rounded-md"
                :class="{ 'border-primary-500': formStore.forWho === 'me' }">
                <RadioButton value="me" v-model="formStore.forWho" />
                <label for="size_large" class="text-lg">{{ $t('for_me') }}</label>
            </div>
            <div class="flex items-center gap-2 border-2 p-4 rounded-md"
                :class="{ 'border-primary-500': formStore.forWho === 'someone_else' }">
                <RadioButton value="someone_else" v-model="formStore.forWho" />
                <label for="size_large" class="text-lg">{{ $t('for_someone_else') }}</label>
            </div>
        </div>
        <div v-if="formStore.forWho === 'me'" class="mt-4">
            <IconField>
                <FloatLabel variant="on">
                    <InputText id="enter_policy_number" autocomplete="off" fluid size="large"
                        @keyup.enter="handlePolicyNumberEnter" />
                    <label for="enter_policy_number">{{ $t('enter_policy_number') }}</label>
                </FloatLabel>
                <InputIcon>
                    <Icon name="material-symbols:search" />
                </InputIcon>
            </IconField>
        </div>
        <div v-if="formStore.forWho === 'someone_else'" class="mt-4 grid gap-4">
            <div>
                {{ $t('enter_insured_details') }}
            </div>
            <div>
                <FloatLabel variant="on">
                    <InputText id="personal_number" autocomplete="off" fluid size="large"
                        v-model="formStore.personalNumber" @keyup.enter="handlePersonalEnter" />
                    <label for="personal_number">{{ $t('personal_number') }}</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel variant="on">
                    <DatePicker inputId="date_of_birth" showIcon iconDisplay="input" fluid
                        size="large" v-model="formStore.dateOfBirth"
                        @date-select="handleSomeoneElseSearch" />
                    <label for="date_of_birth">{{ $t('date_of_birth') }}</label>
                </FloatLabel>
            </div>
        </div>
        <div class="mt-4 grid gap-4">
            <div>
                {{ $t('choose_the_person') }}
            </div>
            <div v-for="holder in holders" :key="holder.id"
                class="flex items-center gap-2 border-2 p-4 rounded-md"
                :class="{ 'border-primary-500': formStore.selectedHolder === holder.id }">
                <RadioButton :value="holder.id" v-model="formStore.selectedHolder" />
                <div>
                    <div>
                        {{ holder.name }}
                    </div>
                    <div class="text-muted-color">
                        {{ holder.policyCode }} {{ holder.policyNumber }}
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 flex justify-between">
            <Button severity="secondary" disabled @click="activateCallback('1')" size="large">
                <Icon name="material-symbols:arrow-back" />
                {{ $t('back') }}
            </Button>
            <Button :disabled="formStore.selectedHolder === null" size="large"
                @click="activateCallback('2')">
                {{ $t('continue') }}
            </Button>
        </div>
    </div>
</template>
