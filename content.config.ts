import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        holders: defineCollection({
            type: "data",
            source: "holders/**.json",
            schema: z.object({
                name: z.string(),
                dateOfBirth: z.string(),
                policyNumber: z.string(),
                personalNumber: z.string(),
                policyCode: z.string(),
            }),
        }),
        hospitals: defineCollection({
            type: "data",
            source: "hospitals/**.json",
            schema: z.object({
                name: z.object({
                    ka: z.string(),
                    en: z.string(),
                }),
                address: z.object({
                    ka: z.string(),
                    en: z.string(),
                }),
                city: z.string(),
                icon: z.string(),
            }),
        }),
        doctors: defineCollection({
            type: "data",
            source: "doctors/**.json",
            schema: z.object({
                name: z.object({
                    ka: z.string(),
                    en: z.string(),
                }),
                type: z.enum(["primary", "specialist", "examiner"]),
                speciality: z.object({
                    ka: z.string(),
                    en: z.string(),
                }).optional(),
                exam: z.object({
                    ka: z.string(),
                    en: z.string(),
                }).optional(),
                avatar: z.string(),
                description: z.object({
                    ka: z.string(),
                    en: z.string(),
                }).optional(),
                workingHours: z.array(z.string().datetime()),
                bookedSlots: z.array(z.string().datetime()),
                hospital: z.object({
                    name: z.object({
                        ka: z.string(),
                        en: z.string(),
                    }),
                    address: z.object({
                        ka: z.string(),
                        en: z.string(),
                    }),
                    city: z.string(),
                    icon: z.string(),
                }),
            }),
        }),
    }
});