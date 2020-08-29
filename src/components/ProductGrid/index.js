import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import StoreContext from '~/context/StoreContext'
// import {
//   Grid,
//   Product,
//   Title,
//   PriceTag
// } from './styles'
import './styles.scss'
import Button from '../../ShareForm/Button'

const ProductGrid = () => {
  const {
    addVariantToCart,
    store: { client, adding, checkout },
  } = useContext(StoreContext)
  // const productVariant = client.product.helpers.variantForOptions()
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              title
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              variants {
                price
                shopifyId
              }
            }
          }
        }
      }
    `
  )

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))

  return (
    <div className="wrraper-productGrid">
      {allShopifyProduct.edges ? (
        allShopifyProduct.edges.map(
          ({
            node: {
              id,
              handle,
              title,
              images: [firstImage],
              variants: [firstVariant],
            },
          }) => (
            <div className="product-grid" key={id}>
              <Link to={`/product/${handle}/`}>
                {firstImage && firstImage.localFile && (
                  <Image
                    className="image-ProductGrid"
                    fluid={firstImage.localFile.childImageSharp.fluid}
                    alt={handle}
                  />
                )}
              </Link>
              <Link to={`/product/${handle}/`}>
                <span className="title-productGrid">{title}</span>
              </Link>
              <div className="fastbuy-btn">
                <span className="pricetag-productGrid">
                  {getPrice(firstVariant.price)}
                </span>
                <Button
                  onClick={() => addVariantToCart(firstVariant.shopifyId, 1)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          )
        )
      ) : (
        <p>No Products found!</p>
      )}
    </div>
  )
}

export default ProductGrid
