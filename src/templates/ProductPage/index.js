import React, { useState } from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import {
  Img,
  Container,
  TwoColumnGrid,
  GridLeft,
  GridRight,
  ShowImg,
  WrapPic,
} from '~/utils/styles'

import { ProductTitle, ProductDescription } from './styles'

import { css, jsx } from '@emotion/core'

import './test.css'
import { set } from 'lodash'

const ProductPage = ({ data }) => {
  const [index, setIndex] = useState(0)

  const [actived, setActived] = useState('')
  const SlideImage = (props) => {
    const { iimage, isActive, link} = props
    const imageClick1 = () => {
      props.onClick(props.iimage)
    }
    return (
      <img
        onMouseOver={imageClick1}
        onClick={imageClick1}
        className={props.isActive ? 'active' : ''}
        src={props.link}
        alt=""
      />
    )
  }
  const imageClick = ( i) => {
    setIndex(i)
  }

  const product = data.shopifyProduct
  let active
  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Container>
        <TwoColumnGrid>
          <GridLeft>
            <h1>Our product picture</h1>
            <img
              src={product.images[index].localFile.childImageSharp.fluid.src}
              alt={product.title}
            />
            {/* <WrapPic className="pic-wrap"> */}
            <ShowImg>
              {product.images.map((image, a) => (

                <SlideImage
                  link={image.localFile.childImageSharp.fluid.src}
                  isActive={index === a}
                  iimage={a}
                  onClick={imageClick}
                />
              ))}
            </ShowImg>
            {/* </WrapPic> */}
          </GridLeft>
          <GridRight>
            <ProductTitle>{product.title}</ProductTitle>
            <hr />
            <ProductForm product={product} />
            <ProductDescription
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </GridRight>
        </TwoColumnGrid>
      </Container>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 310) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductPage
                // <img
                //   key={a}
                //   onClick={e => {
                //     setIndex(a)
                //     console.log(document.getElementsByTagName('img'))
                //     document.getElementsByTagName('img')[1].style.border =
                //       'none'
                //     // window.getElementsByClassName('hello').style.border = 'none'
                //     e.target.style.border = '2px solid red'
                //     // active[index] = /
                //   }}
                //   src={image.localFile.childImageSharp.fluid.src}
                //   alt="hello"
                // />