<script setup lang="ts">
const { setLocale, locale, locales } = useI18n()
const flagOfNotSelectedLocale = computed(() => {
    return locales.value.find((l) => l.code !== locale.value)?.flag
});

const localeNameOfNotSelectedLocale = computed(() => {
    return locales.value.find((l) => l.code !== locale.value)?.name
});
</script>

<template>
    <div class="container mx-auto flex items-center justify-between py-4">
        <div>
            <img src="/images/gpih.png" class="w-32" />
        </div>
        <div>
            <div class="flex items-center h-full">
                <div @click="setLocale($i18n.locale === 'en' ? 'ka' : 'en')"
                    class="flex items-center cursor-pointer h-full">
                    <div class="mr-1 text-3xl">{{ flagOfNotSelectedLocale }}</div>
                    <div>{{ localeNameOfNotSelectedLocale }}</div>
                </div>
                <div class="h-5 w-px bg-gray-300 mx-4"></div>
                <div class="bg-gray-300 rounded-full p-1 flex items-center justify-center">
                    <Icon name="material-symbols:notifications-outline-rounded" class="text-2xl " />
                </div>
                <div class="bg-gray-300 rounded-full p-1 ml-5 flex items-center justify-center">
                    <Icon name="material-symbols:person" class="text-2xl " />
                </div>
                <div class="ml-2">
                    მარიამ
                </div>
                <div class="flex items-center justify-center">
                    <Icon name="material-symbols:arrow-drop-down" class="text-2xl " />
                </div>
            </div>
        </div>

    </div>
</template>
