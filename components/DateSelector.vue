<script setup lang="ts">


const selectedDate = defineModel<Date | null>('selectedDate', {
    type: Date,
    required: true
})

const formStore = useFormStore()
const currentWeekStart = ref(new Date())
const dates = ref<Date[]>([])

const isMobile = ref(false)

const generateDates = () => {
    const result: Date[] = []
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        result.push(new Date(d))
    }
    dates.value = result
}

const checkWidth = () => {
    isMobile.value = window.innerWidth < 768
}

const visibleDates = computed(() => {
    if (isMobile.value) {
        return dates.value
    }
    const startIndex = dates.value.findIndex(
        date => date.toDateString() === currentWeekStart.value.toDateString()
    )
    return dates.value.slice(startIndex, startIndex + 7)
})

const nextWeek = () => {
    const newDate = new Date(currentWeekStart.value)
    newDate.setDate(newDate.getDate() + 7)
    const startOfNewDate = new Date(newDate.setHours(0, 0, 0, 0))
    const lastDate = new Date(dates.value[dates.value.length - 1].setHours(0, 0, 0, 0))
    if (startOfNewDate <= lastDate) {
        currentWeekStart.value = newDate
    }
}

const prevWeek = () => {
    const newDate = new Date(currentWeekStart.value)
    newDate.setDate(newDate.getDate() - 7)
    const startOfNewDate = new Date(newDate.setHours(0, 0, 0, 0))
    const startOfFirstDate = new Date(dates.value[0].setHours(0, 0, 0, 0))
    if (startOfNewDate >= startOfFirstDate) {
        currentWeekStart.value = newDate
    }
}


const selectCurrentDate = () => {
    const today = new Date()
    selectedDate.value = today
    currentWeekStart.value = today
}


onMounted(() => {
    checkWidth()
    generateDates()
    selectCurrentDate()
    window.addEventListener('resize', checkWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkWidth)
})
</script>

<template>
    <div class="h-36 relative left-[calc(-50vw+50%)] w-dvw bg-surface-200">
        <div class="grid grid-cols-1 md:grid-cols-6 container w-full md:w-5/6 mx-auto h-full">
            <div class="hidden md:flex items-center md:col-span-1">
                <Button @click="selectCurrentDate" size="large" severity="secondary">
                    <Icon name="material-symbols:calendar-month" class="text-2xl" />
                    {{ $t('today') }} - {{ new Date().toLocaleDateString($i18n.locale, {
                        month: 'short',
                        day: 'numeric'
                    }) }}
                </Button>
            </div>
            <div class="flex w-full items-center mx-auto px-4 col-span-full md:col-span-5">
                <div class="flex items-center justify-between w-full">
                    <div class="hidden md:flex items-center gap-2 h-full">
                        <Button @click="prevWeek" class="rounded-full hover:bg-surface-300" variant="text" size="large">
                            <Icon name="material-symbols:arrow-back" class="text-4xl" />
                        </Button>
                    </div>

                    <div class="flex justify-start px-4 gap-4 md:w-full overflow-x-auto md:overflow-hidden">
                        <div v-for="date in visibleDates" :key="date.toISOString()"
                            class="flex flex-col items-center w-1/3 md:w-[14.28%] cursor-pointer p-1 rounded-lg" :class="{
                                'bg-primary-100 text-primary-900': selectedDate && date.toDateString() === selectedDate.toDateString(),
                                'hover:bg-surface-300': !selectedDate || date.toDateString() !== selectedDate.toDateString()
                            }" @click="selectedDate = date">
                            <div class="text-sm">{{ date.toLocaleDateString($i18n.locale, { weekday: 'short' }) }}</div>
                            <div class="text-lg font-semibold">{{ date.getDate() }}</div>
                            <div class="text-sm">{{ date.toLocaleDateString($i18n.locale, { month: 'short' }) }}</div>
                        </div>
                    </div>
                    <div class="hidden md:flex items-center gap-2">
                        <Button @click="nextWeek" class="p-2 rounded-full hover:bg-surface-300" variant="text"
                            size="large">
                            <Icon name="material-symbols:arrow-forward" class="text-4xl" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>