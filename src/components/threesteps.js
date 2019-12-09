import React from 'react'
import Button from './button'
import { graphql, useStaticQuery } from "gatsby"

const ThreeSteps = React.forwardRef((props, ref) => {

    const data = useStaticQuery(graphql`
        query {
            school: contentfulSchool(schoolname: {eq: "Tech Elevator"}) {
                applicationsLive
                threeSteps {
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
        <div className="p-4" ref={ref}>
            <h2 className="text-primary font-normal text-center">Getting Started</h2>
            <div className="flex flex-col lg:flex-row justify-center text-center">

                <div id="stepCard1" className="stepCards flex flex-col items-center m-2 lg:w-1/3 p-4 rounded shadow-2xl bg-white border-primary border-t-8">
                    <p className="rounded-full h-10 w-10 flex items-center justify-center border border-primary">1</p>
                    <h3 className="uppercase">{data.school.threeSteps.content[0].content[0].value}</h3>
                    <p>{data.school.threeSteps.content[1].content[0].value}<strong>{data.school.threeSteps.content[1].content[1].value}</strong>{data.school.threeSteps.content[1].content[2].value}</p>
                </div>

                {/* vvv Update this section as needed vvv */}
                <div id="stepCard2" className="stepCards flex flex-col items-center m-2 lg:w-1/3 p-4 rounded shadow-2xl bg-white border-primary border-t-8">
                    <p className="rounded-full h-10 w-10 flex items-center justify-center border border-primary">2</p>
                    <h3 className="uppercase">{data.school.threeSteps.content[2].content[0].value}</h3>
                    <p>{data.school.threeSteps.content[3].content[0].value}</p>
                </div>
                {/* ^^^ Update this section as needed ^^^ */}

                <div id="stepCard3" className="stepCards flex flex-col items-center m-2 lg:w-1/3 p-4 rounded shadow-2xl bg-white border-primary border-t-8">
                    <p className="rounded-full h-10 w-10 flex items-center justify-center border border-primary">3</p>
                    <h3 className="uppercase">{data.school.threeSteps.content[4].content[0].value}</h3>
                    <p className="m-0">{data.school.threeSteps.content[5].content[0].value}</p>
                    <Button
                        buttonClassName="opacityApply uppercase bg-primary p-3 rounded-full shadow-lg text-white w-40"
                        divClassName="flex justify-center mt-5"
                        text={data.school.applicationsLive ? "apply now" : "notify me"}
                        onClick={props.onClick}
                        id="applyThreeSteps"
                    /> 
                </div>
                
            </div>
        </div>
    )
})

export default ThreeSteps