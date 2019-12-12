import React from 'react'
import { graphql, useStaticQuery } from "gatsby"

const LeadContent = props => {

    const data = useStaticQuery(graphql`
        query {
            school: contentfulSchool(schoolname: {eq: "Tech Elevator"}) {
                leadContent {
                    leadContent
                }
            }
        }
    `)

    const leadContent = data.school.leadContent.leadContent.split("-")
    return (
        <div className="flex flex-col text-center py-8">
            <h2 className="px-4">{leadContent[0]}</h2>
            
            {/* update with school-specific info */}
            <p className="text-center px-8">{leadContent[1]}</p>
        </div>
    )
}
 
export default LeadContent