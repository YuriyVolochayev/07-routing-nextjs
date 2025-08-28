import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";

export default async function App() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1],
        queryFn: () => fetchNotes(""),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient/>
        </HydrationBoundary>
    )

}