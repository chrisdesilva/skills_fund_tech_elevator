import React from 'react'
import Button from './button'
import { graphql, useStaticQuery } from "gatsby"

const ThreeSteps = React.forwardRef((props, ref) => {

    const data = useStaticQuery(graphql`
        query {
            school: contentfulSchool(schoolname: {eq: "Tech Elevator"}) {
                applicationsLive
                threeSteps {
                    threeSteps
                }
            }
        }
    `)

    const threeStepsText = data.school.threeSteps.threeSteps.split("-")
    
    return (
        <div className="p-4" ref={ref}>
            <h2 className="text-primary font-normal text-center">Getting Started</h2>
            <div className="flex flex-col lg:flex-row justify-center text-center">

                <div id="stepCard1" className="stepCards flex flex-col items-center m-2 lg:w-1/3 p-4 rounded shadow-2xl bg-white border-primary border-t-8">
                    <p className="rounded-full h-10 w-10 flex items-center justify-center border border-primary">1</p>
                    <h3 className="uppercase">{threeStepsText[0]}</h3>
                    <p>{threeStepsText[1]}<strong> {threeStepsText[2]} </strong>{threeStepsText[3]}</p>
                </div>

                {/* vvv Update this section as needed vvv */}
                <div id="stepCard2" className="stepCards flex flex-col items-center m-2 lg:w-1/3 p-4 rounded shadow-2xl bg-white border-primary border-t-8">
                    <p className="rounded-full h-10 w-10 flex items-center justify-center border border-primary">2</p>
                    <h3 className="uppercase">{threeStepsText[4]}</h3>
                    <p>{threeStepsText[5]}</p>
                </div>
                {/* ^^^ Update this section as needed ^^^ */}

                <div id="stepCard3" className="stepCards flex flex-col items-center m-2 lg:w-1/3 p-4 rounded shadow-2xl bg-white border-primary border-t-8">
                    <p className="rounded-full h-10 w-10 flex items-center justify-center border border-primary">3</p>
                    <h3 className="uppercase">{threeStepsText[6]}</h3>
                    <p className="m-0">{threeStepsText[7]}</p>
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