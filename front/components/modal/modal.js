import React from 'react'
import styles from './modal.module.css'

const modal = ({ show, onClose, children }) => {
  return (
    <div className={styles.modal} hidden={!show}>
      <h2>Producto agregado!
        <button onClick={onClose}>X</button>
      </h2>
      <div className={styles.content}>Le recomendamos los siguientes productos</div>
      <div className={styles.cardContainer}>{children}</div>
      <div className={styles.actions}>
      </div>
    </div>
  )
}

export default modal
