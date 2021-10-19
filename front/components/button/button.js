import React from 'react'
import styles from './button.module.css';

const button = ({ type, click }) => {
  return (
    <button className={`${styles.btn} ${styles.btnDelete}`} onClick={click}>
      <span className={`${styles.mdi} ${styles.mdiDelete}`}></span>
      <span className={`${styles.mdi} ${styles.mdiDeleteEmpty}`}></span>
      <span>{type}</span>
    </button>
  )
}

export default button;