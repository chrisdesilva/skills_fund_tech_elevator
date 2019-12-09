import React, { useEffect, useState } from 'react'
import LoanCalcPaymentTable from './loancalcpaymenttable'
import { UnmountClosed as Collapse } from 'react-collapse'
import { graphql, useStaticQuery } from "gatsby"
// import { 
//     faq,
//     paymentTable,
//     placeholder,
//     programLoanInfo
// } from '../constants/programInfo'

const LoanCalculator = () => {
    const data = useStaticQuery(graphql`
        query {
            school: contentfulSchool(schoolname: {eq: "Tech Elevator"}) {
                defaultLoanAmount
                interestRate36
                interestRate60
                placeholderAmount
                origFee
                paymentTable {
                    show
                    data {
                      col
                      max
                      tuition
                      program
                    }
                }
                programMaxText {
                  programMaxText
                }
                programLoanInfo {
                  name
                  hasIO
                  hasIR
                  metros {
                    location
                    maxLoanAmt
                  }
                  loanType
                  multiMetros
                  APR36
                  APR60
                  nonPaymentPeriod
                  loanInfo {
                    loanTerm36
                    loanTerm60
                    maxLoanAmt
                  }
                  showLoanTypes
                }
            }
        }
    `)

    const interestRates = {
        ir36: Number(data.school.interestRate36),
        ir60: Number(data.school.interestRate60)
    }
    const defaultLoanAmount = data.school.defaultLoanAmount
    const [loanAmount, setLoanAmount] = useState(data.school.defaultLoanAmount)
    const [loanOptions, showLoanOptions] = useState(false) // used to display 36 and 60 month term options
    const minLoanAmt = 2000
    const [interestPayment, setInterestPayment] = useState({ payment36: null, payment60: null })
    const [monthlyPayment, setMonthlyPayment] = useState({ payment36: null, payment60: null })
    const [loanType, setLoanType] = useState(data.school.programLoanInfo[0]['loanType']) // default to 0 for interest-only, 1 for immediate repayment
    const [multiMetros, showMetros] = useState(data.school.programLoanInfo[0].multiMetros) // shows metro dropdown
    const [loanTypes, showLoanTypes] = useState(data.school.programLoanInfo[0].showLoanTypes) // shows IR/IO dropdown
    const [metros, setMetros] = useState(data.school.programLoanInfo[0].metros) || useState(null)
    const [loanInformation, setLoanInformation] = useState(data.school.programLoanInfo[0].loanInfo) // set initial loan info
    const [programIndex, setProgramIndex] = useState(0)
    const [metroIndex, setMetroIndex] = useState(0)
    

 const selectProgram = e => {
    let program = e.target.value
    setProgramIndex(program) // sets index for programLoanInfo object in programInfo.js
}

useEffect(() => { // watches for updates to the programIndex, updates dropdown/loan info accordingly
    setLoanInformation(data.school.programLoanInfo[programIndex]['loanInfo'])
    setLoanType(data.school.programLoanInfo[programIndex]['loanType'])
    setMetros(data.school.programLoanInfo[programIndex]['metros']['locations'])
    showMetros(data.school.programLoanInfo[programIndex]['showMetros'])
    showLoanTypes(data.school.programLoanInfo[programIndex]['showLoanTypes'])
}, [programIndex])

const selectMetro = e => {
    let metro = e.target.value
    setMetroIndex(metro) // sets index of selected metro within programLoanInfo[index]['metros]
}

useEffect(() => { // watches for changes to metroIndex, updates dropdown/loan info accordingly
    setLoanInformation(data.school.programLoanInfo[programIndex]['metros'][metroIndex]['maxLoanAmt'])
}, [metroIndex])


const updateLoanAmount = e => {
    setLoanAmount(Number(e.target.value))
}

const calculateMonthlyPayment = () => {
    const monthlyRate36 = (interestRates.ir36 / 100) / 12
    const monthlyRate60 = (interestRates.ir60 / 100) / 12
    const borrowedAmount = loanAmount || defaultLoanAmount
    const totalLoan = borrowedAmount * (1 + Number(data.school.origFee))
    let pv = totalLoan
    let payment36 = Number((monthlyRate36 * pv) / (1 - (1 / Math.pow(1 + monthlyRate36, 36)))).toFixed(2)
    let payment60 = Number((monthlyRate60 * pv) / (1 - (1 / Math.pow(1 + monthlyRate60, 60)))).toFixed(2)
    setMonthlyPayment({ payment36: payment36, payment60: payment60 })
    setLoanAmount(borrowedAmount)
    calculateInterest()
    showLoanOptions(true)
}

const calculateInterest = () => {
    let interest36 = (loanAmount * (1 + Number(data.school.origFee)) / 12 * (8.99 / 100)).toFixed(2)
    let interest60 = (loanAmount * (1 + Number(data.school.origFee)) / 12 * (10.99 / 100)).toFixed(2)
    setInterestPayment({payment36: interest36, payment60: interest60})
}

const calculateUpdatedAmount = () => {
    showLoanOptions(false)
    setLoanAmount(data.school.defaultLoanAmount)
}

    return (
        <div className="flex flex-col justify-center m-2 lg:m-10">
            <div className="shadow-xl rounded h-auto p-8 flex flex-col items-center">
                <h3 className="text-center">Calculate Your Monthly Payments</h3>

                {/* UPDATE LOAN AMOUNTS AND COST OF LIVING BY PROGRAM BELOW */}
                <p className="text-center">{data.school.programMaxText.programMaxText}</p>
                {data.school.paymentTable.show && <LoanCalcPaymentTable />}

                <div className="flex flex-col justify-center w-full md:w-1/3">
                
                {/* ADD OR REMOVE PROGRAMS BELOW */}
                {data.school.multiPrograms &&
                    <>
                        <label className="text-xs text-center">Select a Program:</label>
                        <select className="rounded border-2 border-primary mb-5 bg-white text-primary text-center" onChange={selectProgram}>
                            {data.school.programLoanInfo.map((program, i) => {
                                return <option key={program.name} value={i}>{program.name}</option>
                            })}
                        </select>
                    </>
                }

                {/* ADD OR REMOVE METROS BELOW */}
                    <Collapse isOpened={data.school.programLoanInfo[programIndex].multiMetros} springConfig={{stiffness: 150, damping: 30}}>
                        <div className="flex flex-col">
                            <label className="text-xs text-center">Select a Metro:</label>
                            <select onChange={selectMetro} className="rounded border-2 border-primary mb-5 bg-white text-primary text-center">
                                {data.school.programLoanInfo[programIndex].metros.map((city, i) => {
                                    return <option key={city} value={i}>{city.location}</option>
                                })}
                            </select>
                        </div>
                    </Collapse>
                
                


                {/* DROPDOWN MENU FOR LOAN TYPES */}
                <Collapse isOpened={loanTypes} springConfig={{stiffness: 150, damping: 30}}>
                    <div className="flex flex-col">
                        <label className="text-xs text-center">Select a Loan Type:</label>
                        <select className="rounded border-2 border-primary mb-5 bg-white text-primary text-center" onChange={(e) => setLoanType(e.target.value)}>
                            <option value="0">Interest-Only</option>
                            <option value="1">Immediate Repayment</option>
                        </select>
                    </div>
                </Collapse>
                </div>

                {/* LOAN AMOUNT INPUT */}
                <div className="flex flex-col justify-center items-center w-1/2 md:w-1/3">
                    <Collapse isOpened={!loanOptions}>
                        <label className="text-xs text-center">Enter a loan amount:</label>
                    </Collapse>
                    <Collapse isOpened={loanOptions}>
                        <label className="text-center">Loan amount entered: {loanAmount}</label>
                    </Collapse>
                    <Collapse isOpened={!loanOptions}>
                        <input type="number" onChange={updateLoanAmount} className="rounded border-2 border-primary p-3 mb-5 text-primary text-center text-2xl" maxLength="6" placeholder={data.school.placeholderAmount} />
                    </Collapse>
                </div>

                <Collapse isOpened={minLoanAmt > loanAmount || loanAmount > data.school.programLoanInfo[programIndex].loanInfo.maxLoanAmt}>
                    <p className="text-red-500 text-xs m-0 pb-4">Please enter a number between {minLoanAmt} and {data.school.programLoanInfo[programIndex].loanInfo.maxLoanAmt}</p>
                </Collapse>
                {!loanOptions ? 
                    <button className="opacityApply uppercase bg-primary p-3 mb-4 lg:ml-4 w-48 rounded-full shadow-lg text-white" onClick={calculateMonthlyPayment}>Calculate payments</button> :
                    <button className="opacityApply uppercase bg-black p-3 mb-4 lg:ml-4 w-48 rounded-full shadow-lg text-white" onClick={calculateUpdatedAmount}>Update Amount</button>
                }

                <p className="m-0 text-center">Students may borrow from ${minLoanAmt} to ${data.school.programLoanInfo[programIndex].loanInfo.maxLoanAmt}</p>
                {loanType === "io" && <p className="text-xs text-center hidden lg:inline mb-2">Make interest-only payments while in the program. Two months after completion, begin full payments.</p>}
                {loanType === "ir" && <p className="text-xs text-center hidden lg:inline mb-2">Start making full payments (interest + principal) about one month after disbursement.</p>}
                <Collapse isOpened={loanOptions} springConfig={{stiffness: 150, damping: 40}}>
                    <div className="px-4 md:px-12 pt-8 flex flex-col lg:flex-row">
                        
                        {/* OPTION 1, 36 MONTHS */}
                        {data.school.programLoanInfo[programIndex].loanInfo.loanTerm36 &&
                            <div className={data.school.programLoanInfo[programIndex].loanInfo.loanTerm60 ? "flex flex-col mb-8 lg:mb-0 lg:mx-6" : "flex flex-col"}>
                                <h3 className="text-primary text-center font-normal">Option 1</h3>
                                <h4 className="text-primary text-center font-normal">36-Month Fixed Rate Loan</h4>
                                <p className="m-0 text-center">{interestRates.ir36}% Interest Rate, {data.school.programLoanInfo[programIndex].APR36} APR*</p>
                                {loanType === "io" && <p className="text-xs text-center lg:hidden mb-2">Make interest-only payments while in the program. Two months after completion, begin full payments.</p>}
                                {loanType === "ir" && <p className="text-xs text-center lg:hidden mb-2">Start making full payments (interest + principal) about one month after disbursement.</p>}
                                <p className="font-bold text-center my-4">Payments:</p>
                                    <div className="flex justify-around">
                                        {loanType === "io" && 
                                            <div className="flex flex-col items-center">
                                                <h4 className="border-primary border-b text-center font-normal mx-5 mb-3">Interest-Only Period</h4>
                                                    <p className="text-primary text-2xl mb-0">${interestPayment.payment36}</p>
                                                <p className="text-xs">per month</p>
                                            </div>
                                        }
                                        <div className="flex flex-col items-center">
                                            <h4 className="border-primary border-b text-center font-normal mx-5 mb-3">Full Payment Period</h4>
                                                    <p className="text-primary text-2xl mb-0">${monthlyPayment.payment36}</p>
                                            <p className="text-xs">per month</p>
                                        </div>
                                    </div>
                            </div>
                        }

                        {/* OPTION 2, 60 MONTHS */}
                        {data.school.programLoanInfo[programIndex].loanInfo.loanTerm60 &&
                            <div className="flex flex-col lg:mx-6">
                                <h3 className="text-primary text-center lg:mt-0 font-normal">{data.school.programLoanInfo[programIndex].loanInfo.loanTerm36 && data.school.programLoanInfo[programIndex].loanInfo.loanTerm60 ? "Option 2" : "Option 1"}</h3>
                                <h4 className="text-primary text-center lg:mt-0 font-normal">60-Month Fixed Rate Loan</h4>
                                <p className="m-0 text-center">{interestRates.ir60}% Interest Rate, {data.school.programLoanInfo[programIndex].APR60} APR*</p>
                                <p className="text-xs text-center lg:hidden">Make interest-only payments while in the program. Two months after completion, begin full payments.</p>
                                <p className="font-bold text-center my-4">Payments:</p>
                                <div className="flex justify-around">
                                        {loanType === "io" && 
                                            <div className="flex flex-col items-center">
                                                <h4 className="border-primary border-b text-center font-normal mx-5 mb-3">Interest-Only Period</h4>
                                                    <p className="text-primary text-2xl mb-0">${interestPayment.payment60}</p>
                                                <p className="text-xs">per month</p>
                                            </div>
                                        }
                                        <div className="flex flex-col items-center">
                                            <h4 className="border-primary border-b text-center font-normal mx-5 mb-3">Full Payment Period</h4>
                                                    <p className="text-primary text-2xl mb-0">${monthlyPayment.payment60}</p>
                                            <p className="text-xs">per month</p>
                                        </div>
                                    </div>
                            </div>
                        }

                    </div>
                </Collapse>
                <Collapse isOpened={loanOptions} springConfig={{stiffness: 150, damping: 40}}>
                    <p className="text-center text-xs m-0 p-3"><i>*The Annual Percentage Rate (APR) shown is estimated based on the loan type, origination fee, and approximate program length. The actual APR may be slightly different than the example provided based on loan type and program length. To learn how an Annual Percentage Rate (APR) is calculated, <a href="https://skills.fund/resources/how-is-an-apr-calculated" rel="noreferrer noopener">visit our blog.</a></i></p>
                </Collapse>
            </div>
        </div>
    )
}


export default LoanCalculator