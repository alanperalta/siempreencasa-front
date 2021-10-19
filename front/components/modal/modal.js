import React from 'react'
import styles from './modal.module.css'

const modal = ({ show, onClose, children }) => {
  return (
    <div className={styles.modal} hidden={!show}>
      <h2>Producto agregado!</h2>
      <div className={styles.content}>Le recomendamos los siguientes productos</div>
      {children}
      <div className={styles.actions}>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

export default modal
