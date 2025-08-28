import css from "@/components/Footer/Footer.module.css"


const Footer = () => {
    return (
        <footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Yurii Volochaiev</p>
      <p>
        Contact us:
        <a href="mailto:yuriy.volochaiev@gmail.com">yuriy.volochaiev@gmail.com</a>
      </p>
    </div>
  </div>
</footer>

    )
}

export default Footer