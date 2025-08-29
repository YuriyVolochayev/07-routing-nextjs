import css from "@/app/notes/filter/LayoutNotes.module.css"

interface LayoutNotesProps {
    children: React.ReactNode
}

const LayoutNotes = ({ children }: LayoutNotesProps) => {
    
    return (
        <section>
            <div className={css.notesWrapper}>{children}</div>
        </section>
    );
};

export default LayoutNotes