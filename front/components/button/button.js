import React from 'react'
import styles from './button.module.css';

const button = ({ type, click }) => {
  return (
    <button className={styles.btn} onClick={click}>
      {type === "Add" ?
        <span>Agregar</span> :
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.45546 17.5288C1.45546 18.6899 2.40546 19.6399 3.56657 19.6399H12.011C13.1721 19.6399 14.1221 18.6899 14.1221 17.5288V4.86211H1.45546V17.5288ZM15.1777 1.69545H11.4832L10.4277 0.639893H5.1499L4.09435 1.69545H0.399902V3.80656H15.1777V1.69545Z" fill="#919191"></path>
        </svg>}
    </button>
  )
}

export default button;