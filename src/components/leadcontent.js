import React from 'react'
import { graphql, useStaticQuery } from "gatsby"

const LeadContent = props => {

    const data = useStaticQuery(graphql`
        query {
            school: contentfulSchool(schoolname: {eq: "Tech Elevator"}) {
                leadContent {
                    content {
                      content {
                        value
                      }
                    }
                }
            }
        }
    `)

    return (
        <div className="flex flex-col text-center py-8">
            <h2 className="px-4">{data.school.leadContent.content[0].content[0].value}</h2>
            
            {/* update with school-specific info */}
            <p className="text-center px-8">{data.school.leadContent.content[1].content[0].value}</p>
        </div>
    )
}
 
export default LeadContent