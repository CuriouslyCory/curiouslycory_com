import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MyLink from "../components/mylink"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Find me on...</h1>
    <MyLink link="https://curiouslycory.etsy.com/" logo="Etsy" />
    <MyLink link="https://www.youtube.com/channel/UCASQA6u80u7Py_UHIGFYqVA?view_as=subscriber" logo="Youtube" />
  </Layout>
)

export default IndexPage
