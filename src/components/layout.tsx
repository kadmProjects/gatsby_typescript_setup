import React, { ReactNode } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import { Analytics } from './analytics';
import { TestComponent01 } from './test-component-01';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import * as Lodash from 'lodash';

interface Props {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    console.log(Lodash.dropRight([1, 2, 3]));
    return (
        <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
                style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0 1.0875rem 1.45rem`,
                }}
            >
                <button
                    onClick={e => {
                        // To stop the page reloading
                        e.preventDefault()
                        // Lets track that custom click
                        trackCustomEvent({
                        // string - required - The object that was interacted with (e.g.video)
                        category: "Special Button",
                        // string - required - Type of interaction (e.g. 'play')
                        action: "Click",
                        // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
                        label: "Gatsby Plugin Example Campaign",
                        // number - optional - Numeric value associated with the event. (e.g. A product ID)
                        value: 43
                        })
                        //... Other logic here
                    }}
                >
                    Tap that!
                </button>
                <Analytics />
                <TestComponent01 />
                <OutboundLink href="https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/">
                    Visit the Google Analytics plugin page!
                </OutboundLink>
                <main>{children}</main>
                <footer>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
            </div>
        </>
    )
}

export default Layout
