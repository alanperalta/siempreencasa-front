import React from 'react';
import styles from './layout.module.css'
import Image from "next/image";

const layout = ({ children }) => {
  return (
    <div>
      <nav className={styles.navbar}>
        <a href="/" id="brand">
          <Image src="https://cdn.shopify.com/s/files/1/0254/2947/5433/t/12/assets/new_logo-black.svg?v=15514233714370248417" height={100} width={100} alt="" />
        </a>
      </nav>
      {children}
      <footer>
        Siempre en casa
      </footer>
    </div>
  )
}

export default layout
