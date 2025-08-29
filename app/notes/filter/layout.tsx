import css from "@/app/notes/filter/LayoutNotes.module.css"

interface LayoutNotesProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}

const LayoutNotes = ({ children, sidebar }: LayoutNotesProps) => {
    
    return (
        <section>
            <aside className={css.sidebar}>{ sidebar}</aside>
            <div className={css.notesWrapper}>{children}</div>
        </section>
    );
};

export default LayoutNotes