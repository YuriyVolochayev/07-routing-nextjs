"use client"

import css from "@/app/notes/Notes.module.css"
import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import NoteList from "@/components/NoteList/NoteList"
import { fetchNotes } from "@/lib/api"
import Pagination from "@/components/Pagination/Pagination"
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import Modal from "@/components/Modal/Modal"
import NoteForm from "@/components/NoteForm/NoteForm"
import { Toaster } from 'react-hot-toast'
import SearchBox from "@/components/SearchBox/SearchBox"

const NotesClient = () => {
    const [page, setPage] = useState<number>(1)
    const [query, setQuery] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [debouncedQuery] = useDebounce(query, 400)

    const {
        data: notes,
        isSuccess,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['notes', debouncedQuery, page],
        queryFn: () => fetchNotes(debouncedQuery, page),
        placeholderData: keepPreviousData,
    })

    const totalPages = notes?.totalPages ?? 1
    const onQueryChange = useDebouncedCallback(
        (value: string) => {
            setPage(1)
            setQuery(value)
        }, 400
    )


    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

     if (isLoading) {
        return <p>Loading, please wait...</p>
    };

    if (error || !notes) {
        return <p>Could not fetch the list of notes.</p>

    }

        return (
        <div className={css.app}>
            <Toaster/>
            <header className={css.toolbar}>
                <SearchBox onSearch={onQueryChange}/>
                {totalPages > 1 && (<Pagination pageCount={totalPages} currentPage={page} onPageChange={setPage} />)}
                <button className={css.button} onClick={openModal}>Create note +</button>
            </header>
                {isSuccess && notes && (
                    <NoteList notes={notes.notes} />)}
            {isModalOpen && (<Modal onClose={closeModal}>
                <NoteForm
                    onClose={closeModal}
                    onCancel={closeModal}
                />
                </Modal>
            )}
        </div>
    )
}

export default NotesClient
