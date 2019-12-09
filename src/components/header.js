import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from 'gatsby'
import skillsFund from "../images/skillsFund_logo.png"


const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      school: contentfulSchool(schoolname: {eq: "Tech Elevator"}) {
        schoolurl
        schoolname
        schoolLogo {
          file {
            url
          }
        }
      }
    }
  `)

const school = data.school

  return (
    <header>
      <div className="flex justify-center shadow-lg">
        <div className="w-full flex justify-around items-center py-2 px-2 lg:px-0">
            <a
              href={school.schoolurl}
              target="_blank"
              rel="noreferrer noopener"
              className="w-1/2 lg:w-1/3 flex justify-center"
            >
              <img
                src={school.schoolLogo.file.url} 
                alt={school.schoolname}
                className="h-8"
                loading="lazy"
                id="schoolLogo"
              />
            </a>
            <div className="w-1/3 flex justify-center hidden lg:block">
              <h3 className="font-light mb-0 text-center">{school.schoolname} tuition made easy</h3>
            </div>
            <a
              href="https://skills.fund/"
              target="_blank"
              rel="noreferrer noopener"
              className="w-1/2 lg:w-1/3 flex justify-center"
            >
              <img
                src={skillsFund} 
                alt="Skills Fund logo"
                className="h-8"
                loading="lazy"
                id="skfLogo"
              />
            </a>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
