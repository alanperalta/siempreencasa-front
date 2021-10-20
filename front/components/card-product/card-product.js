import React from 'react'
import Image from 'next/image'
import Button from '../button/button'
import styles from './card-product.module.css'

const cardProduct = ({ product, addRemove, typeButton }) => {
  return (
    <div className={styles.card}>
      <Image src={product.image_url} height={100} width={100} />
      <h3>{product.name}</h3>
      <div className={styles.priceButtons}>
        <p>${product.total_price}</p>
        <Button type={typeButton} click={addRemove} />
      </div>
    </div>
  )
}

export default cardProduct
