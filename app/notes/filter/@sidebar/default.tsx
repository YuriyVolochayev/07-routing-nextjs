import css from "@/app/notes/filter/@sidebar/SidebarNotes.module.css"
import Link from "next/link"


const tags: string[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"]

const SidebarNotes = async () => {
    return (
        <ul className={css.menuList}>
            <li className={css.menuItem} key={"All"}>
                <Link href={"/notes/filter/all"} className={css.menuLink}>
                    All notes
                </Link>
            </li>
            {tags.map(tag => (
                <li className={css.menuItem} key={typeof tag === 'string' ? tag : tag}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>))}
        </ul>
    )
}

export default SidebarNotes
