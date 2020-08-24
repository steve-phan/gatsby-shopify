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

const ProductGrid = () => {
  const { store: {checkout} } = useContext(StoreContext)
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(
          sort: {
            fields: [createdAt]
            order: DESC
          }
        ) {
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
              }
            }
          }
        }
      }
    `
  )

  const getPrice = price => Intl.NumberFormat(undefined, {
    currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : 0))

  return (
    <div className='wrraper-productGrid'>
      {allShopifyProduct.edges
        ? allShopifyProduct.edges.map(({ node: { id, handle, title, images: [firstImage], variants: [firstVariant] } }) => (
          <div className='product-grid' key={id} >
            <Link to={`/product/${handle}/`}>
              {firstImage && firstImage.localFile &&
                (<Image
                 className='image-ProductGrid'
                  fluid={firstImage.localFile.childImageSharp.fluid}
                  alt={handle}
                />)}
            </Link>
            <span className='title-productGrid'>{title}</span>
            <span className='pricetag-productGrid'>{getPrice(firstVariant.price)}</span>
          </div>
        ))
        : <p>No Products found!</p>}
    </div>
  )
}

export default ProductGrid
