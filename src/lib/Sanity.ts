import { createClient } from "@sanity/client";

export const sanity = createClient({
    projectId: "htppabbd",
    dataset: "production",
    useCdn: true,
    apiVersion: "2026-04-17",
});