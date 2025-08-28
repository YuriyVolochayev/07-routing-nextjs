"use client"

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik"
import css from '@/components/NoteForm/NoteForm.module.css'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/lib/api"
import { Loading } from "notiflix"
import toast from "react-hot-toast"

interface NoteFormProps {

    onClose: () => void
    onCancel: () => void
}

const formTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const

export interface InitialValues {
    title: string
    content: string
    tag: (typeof formTags) [number]
}

const initialValues: InitialValues = {
    title: '',
    content: '',
    tag: 'Todo',
};

const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title is too long')
        .required('Title is required'),
    content: Yup.string()
        .max(500, 'Text is too long'),
    tag: Yup.string()
        .oneOf(formTags)
        .required('Tag is required'),
    
})

const NoteForm = ({ onClose, onCancel }: NoteFormProps) => {
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ title, content, tag }: InitialValues) => {
            const data = await createNote(title, content, tag)
            return data
        },
        onSuccess: () => {
            onClose()
            Loading.remove()
            toast.success('Note created successfully')
            queryClient.invalidateQueries({queryKey: ['notes']})
        },

        
        onError: () => {
            Loading.remove()
            toast.error('Error creating note')
        },
    })

    const handleSubmit = (values: InitialValues, actions: FormikHelpers<InitialValues>
    ) => {
        Loading.pulse()
        mutation.mutate(values)
        actions.resetForm()
    }
    
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={NoteFormSchema}>
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage name="title" component="span" className={css.error} />
                </div>
                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field
                        as="textarea"
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </div>
                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </div>
                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onCancel}>Cancel</button>
                    <button type="submit" className={css.submitButton}>Create note</button>
                </div>
            </Form>
        </Formik>
        

    )
}

export default NoteForm