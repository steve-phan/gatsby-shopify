import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'

const IndexPage = () => (
  <>
    <SEO
      title="Home"
      keywords={[`restaurant`, `food`, `asian footd`, `delivery food`]}
    />
    <h1>Hi people</h1>
    <p>Welcome to our Restaurant.</p>
    <ProductGrid />
  </>
)

export default IndexPage
