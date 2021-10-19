import Head from 'next/head'
import config from '../config.json'
import React, { useState } from 'react'
import Modal from '../components/modal/modal'
import CardProduct from '../components/card-product/card-product'

export async function getStaticProps() {
  const resProducts = await fetch(`${config.API_URL}/products`);
  const products = await resProducts.json();
  const resCategories = await fetch(`${config.API_URL}/categories`);
  const categories = await resCategories.json();

  return { props: { products, categories } };
}

const Home = ({ products, categories }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartProducts, setCartProducts] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const handleCategoryChange = e => {
    if (e.target.value === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => product.categories && product.categories.includes(e.target.value))
      )
    }
  }

  const handleAddRemoveProduct = async (product_id) => {
    const index = cartProducts.indexOf(product_id);
    //Adding product
    if (index === -1) {
      setCartProducts([...cartProducts, product_id]);
      const resRecommendedProds = await fetch(`${config.API_URL}/recommendations?product_id=${product_id}`);
      const recProds = await resRecommendedProds.json();
      setRecommendedProducts(recProds[0].recommendations);
      setToggleModal(true);
    } else { //Deleting product
      const tmpProducts = [...cartProducts];
      tmpProducts.splice(index, 1);
      setCartProducts(tmpProducts);
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Siempre en casa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Siempre en casa
        </h1>

        <label className="label-categories">Filtrar por categoría</label>
        <select className="categories" onChange={e => handleCategoryChange(e)}>
          <option value="all">Todas</option>
          {categories && categories.map(category => (
            <option key={category} value={category}>{category.toUpperCase()}</option>
          ))}
        </select>

        <div className="grid">
          {filteredProducts && filteredProducts.map(product => (
            <CardProduct typeButton={cartProducts.includes(product.product_id) ? "Delete" : "Add"} key={product.product_id} product={product} addRemove={() => handleAddRemoveProduct(product.product_id)}></CardProduct>
          ))}
        </div>
      </main>

      <Modal show={toggleModal} onClose={() => setToggleModal(false)}>
        {products.filter(p => recommendedProducts.includes(p.product_id))
          .map(product => (
            <CardProduct
              typeButton={cartProducts.includes(product.product_id) ? "Delete" : "Add"}
              key={product.product_id}
              product={product}
              addRemove={() => handleAddRemoveProduct(product.product_id)}>
            </CardProduct>
          ))}
      </Modal>

      <footer>
        Siempre en casa
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 1200px;
          margin-top: 3rem;
        }

        .logo {
          height: 1em;
        }

        .categories{
          margin-top: 0.5rem;
        }

        .label-categories{
          margin-top: 2rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default Home;
