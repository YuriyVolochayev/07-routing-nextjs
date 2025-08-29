"use client"

import css from "@/components/TagsMenu/TagsMenu.module.css"
import { useState } from "react"
import Link from "next/link"

const tags = [ "Todo", "Work",  "Personal", "Meeting", "Shopping"] as const

const TagsMenu = () => {

  const [isOpen, setIsOpen] = useState(false);
    return (
      <div className={css.menuContainer}>
        <button className={css.menuButton} onClick={() => setIsOpen(!isOpen)}>
          Notes ▾
        </button>
        {isOpen && (<ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href={"/notes/filter/All"} className={css.menuLink} onClick={() => setIsOpen(false)}>
              All
            </Link>
          </li>
          {tags.map(tag => (<li className={css.menuItem} key={tag}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={() => setIsOpen(false)}>
              {tag}
            </Link>
          </li>))}
        </ul>)}
</div>

    )
}

export default TagsMenu