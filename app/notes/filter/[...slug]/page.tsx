import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes,  } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import css from "@/app/notes/filter/[...slug]/Notes.module.css";

type Props = {
    params: Promise<{ slug: string[] }>;
};


export default async function App({params}: Props) {
    const queryClient = new QueryClient();
    const {slug} = await params;
    const tag = slug[0] === "All" ? undefined : slug[0];

    await queryClient.prefetchQuery({
        queryKey: ["notes", { query: "", page: 1, tag: tag }],
        queryFn: () => fetchNotes("", 1, undefined, tag),
    });

    return (

        <div className={css.app}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesClient tag={ tag } />
            </HydrationBoundary>
        </div>
        
    )

}