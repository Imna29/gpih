<script lang="ts" setup>
defineProps<{
    activateCallback: (step: string) => void
}>()

const formStore = useFormStore()
</script>

<template>
    <div class="w-full md:w-1/2 mx-auto flex flex-col">
        <div class="text-2xl my-4 font-semibold mx-auto">{{ $t('visit_type_title') }}</div>
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4 border-2 p-4 rounded-md">
                <div class="flex items-center justify-center bg-surface-200 p-2 rounded-md">
                    <Icon name="material-symbols:phone-in-talk-outline-rounded" class="text-4xl" />
                </div>
                <label for="size_large" class="text-lg font-semibold">{{ $t('phone_consultation') }}</label>
                <RadioButton value="phone" v-model="formStore.visitType" class="ml-auto"
                    v-tooltip="$t('phone_consultation_tooltip')" />
            </div>
            <div class="flex items-center gap-4 border-2 p-4 rounded-md">
                <div class="flex items-center justify-center bg-surface-200 p-2 rounded-md">
                    <Icon name="material-symbols:local-hospital-outline" class="text-4xl" />
                </div>
                <label for="size_large" class="text-lg font-semibold">{{ $t('hospital_visit') }}</label>
                <RadioButton value="hospital" v-model="formStore.visitType" class="ml-auto" />
            </div>
            <div class="flex items-center gap-4 border-2 p-4 rounded-md">
                <div class="flex items-center justify-center bg-surface-200 p-2 rounded-md">
                    <Icon name="material-symbols:video-camera-front-outline-rounded" class="text-4xl" />
                </div>
                <label for="size_large" class="text-lg font-semibold">{{ $t('video_consultation') }}</label>
                <RadioButton value="video" v-model="formStore.visitType" class="ml-auto" />
            </div>
        </div>
        <div class="mt-4 flex justify-between">
            <Button severity="secondary"  @click="activateCallback('1')" size="large">
                <Icon name="material-symbols:arrow-back" />
                {{ $t('back') }}
            </Button>
            <Button size="large" @click="activateCallback('3')">
                {{ $t('continue') }}
            </Button>
        </div>
    </div>
</template>