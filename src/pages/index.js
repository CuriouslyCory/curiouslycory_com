import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MyLink from "../components/mylink"

import './index.css'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Find me on...</h1>
    <ul>
      <li><MyLink link="https://curiouslycory.etsy.com/" logo="Etsy" /></li>
      <li><MyLink link="https://www.youtube.com/channel/UCASQA6u80u7Py_UHIGFYqVA?view_as=subscriber" logo="Youtube" /></li>
      <li><MyLink link="https://www.instagram.com/curiouslycory" logo="Instagram" /></li>
      <li><MyLink link="https://blog.hau.me" logo="My Blog" /></li>
      <li><MyLink link="https://cory.hau.me" logo="My (Outdated) Resume" /></li>
      <li><MyLink link="mailto:cory@curiouslycory.com" logo="Email" /></li>
    </ul>
  </Layout>
)

export default IndexPage
