import React, { useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Homepage from '../components/homepage'
import ReactPixel from 'react-facebook-pixel'

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query {
      school: contentfulSchool(schoolname: {eq: "Tech Elevator"}) {
        schoolurl
        skfUrl
        netlifyFormName
        schoolname
        applicationsLive
        disabledLoanAppFormId
      }
    }
  `)

  const school = data.school

  const [IP, setIP] = useState('')

    // Get IP address from client for Hubspot analytics
    async function fetchIP() {
      const res = await fetch("https://ip.nf/me.json")
      res
          .json()
          .then(res => setIP(res.ip.ip))
          .catch(err => console.log(err))
    }

  useEffect(() => {
    ReactPixel.init('928181257515785');
    fetchIP();
  })
  
  return (
    <div>
      <form name={school.netlifyFormName} data-netlify='true' netlify-honeypot='bot-field' hidden>
        <input type='text' name='name' />
        <input type='email' name='email' />
        <input type='text' name='school'/>
        <input type='button' name='identity' />
        <input type='button' name='identity' />
        <input type='button' name='identity' />
        <input type='text' name='otherDescription' />
        <textarea name='comments' />
      </form>
      <Homepage 
        formName={school.netlifyFormName}
        IP={IP}
        pageUri={school.schoolurl}
        schoolName={school.schoolname}
        applicationsLive={school.applicationsLive}
        disabledForm={school.disabledLoanAppFormId}
      />
    </div>
  )
}



export default IndexPage
