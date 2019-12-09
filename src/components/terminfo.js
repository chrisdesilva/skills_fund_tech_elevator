import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import GeneralTerms from './generalterms'
import InterestOnlyTerms from './interestonlyterms'
import ImmRepaymentTerms from './immrepaymentterms'


const TermInfo = props => {

    const data = useStaticQuery(graphql`
        query {
            school: contentfulSchool(schoolname: {eq: "Tech Elevator"}) {
                interestRate36
                interestRate60
                aprRange36
                aprRange60
                interestOnly {
                  APR36
                  APR60
                  IOPayment36
                  IOPayment60
                  LoanExampleAmt
                  LoanExampleOFeeAmt
                  LoanExampleAmtPlusOFee
                  financeCharge36
                  financeCharge60
                  FullMonthlyPayment36
                  FullMonthlyPayment60
                  programName
                  programLength
                }
                immediateRepayment {
                  APR36
                  APR60
                  LoanExampleAmt
                  LoanExampleOFeeAmt
                  LoanExampleAmtPlusOFee
                  FullMonthlyPayment36
                  FullMonthlyPayment60
                  financeCharge36
                  financeCharge60
                }
                faqs {
                    multipleLoanLengths
                    multipleLoanTypes
                }
            }
        }
    `)

    const schoolInfo = data.school

    return (
        <div className="text-center mx-2 lg:mx-10 p-8 shadow rounded">
           <h2 className="py-4 text-center">More Info On Terms</h2>
            <div>
                <GeneralTerms 
                    multipleLoanLengths={schoolInfo.faqs.multipleLoanLengths}
                    multipleLoanTypes={schoolInfo.faqs.multipleLoanTypes}
                    interestRate36={schoolInfo.interestRate36}
                    interestRate60={schoolInfo.interestRate60}
                    IOAPR36={schoolInfo.interestOnly[0].APR36}
                    IOAPR60={schoolInfo.interestOnly[0].APR60}
                    IRAPR36={schoolInfo.immediateRepayment[0].APR36}
                    IRAPR60={schoolInfo.immediateRepayment[0].APR60}
                    APRRange36={schoolInfo.APRRange36}
                    APRRange60={schoolInfo.APRRange60}
                />
    
                {schoolInfo.interestOnly.map(school => {
                    return <InterestOnlyTerms
                    programName={school.programName} 
                    loanExampleAmt={school.LoanExampleAmt}
                    APR36={school.APR36}
                    APR60={school.APR60}
                    finCharge36={school.financeCharge36}
                    finCharge60={school.financeCharge60}
                    ioPayment36={school.IOPayment36}
                    ioPayment60={school.IOPayment60}
                    fullPayment36={school.FullMonthlyPayment36}
                    fullPayment60={school.FullMonthlyPayment60}
                    oFee={school.LoanExampleOFeeAmt}
                    loanPlusOFee={school.LoanExampleAmtPlusOFee}
                    programLength={school.programLength}
                    multipleLoanLengths={schoolInfo.faqs.multipleLoanLengths}
                />
                })}
    
                {schoolInfo.faqs.multipleLoanTypes && schoolInfo.immediateRepayment.map(school => {
                    return <ImmRepaymentTerms
                    programName={school.programName} 
                    loanExampleAmt={school.LoanExampleAmt}
                    APR36={school.APR36}
                    APR60={school.APR60}
                    finCharge36={school.financeCharge36}
                    finCharge60={school.financeCharge60}
                    fullPayment36={school.FullMonthlyPayment36}
                    fullPayment60={school.FullMonthlyPayment60}
                    oFee={school.LoanExampleOFeeAmt}
                    loanPlusOFee={school.LoanExampleAmtPlusOFee}
                    multipleLoanLengths={schoolInfo.faqs.multipleLoanLengths}
                    multipleLoanTypes={schoolInfo.faqs.multipleLoanTypes}
                />
                })
    
                }
            </div>
        </div>
    )
}

export default TermInfo