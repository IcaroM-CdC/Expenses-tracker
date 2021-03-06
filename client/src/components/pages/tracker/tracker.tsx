import { useState, useEffect } from "react"
import Axios from "axios"
import Chart from "react-apexcharts"

import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MoneyOffIcon from '@material-ui/icons/MoneyOff'

import "./tracker.css"

interface TypeProfit {
    value: number
    day: number
    month: number
    year: number
    ownerId: string
}

interface TypeExpense {
    value: number
    day: number
    month: number
    year: number
    ownerId: string
}


// const chartOptions = {
//     chart: {
//         id: "basic-bar"
//     },
//     xaxis: {
//         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
//     }   
// }

// const chartSeries = {
//         series: [
//         {
//             name: "Desktops",
//             data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
//         },
//         {
//             name: "teste",
//             data: [11, 42, 36, 54, 50, 58, 90]
//         }
//     ],
// }



export function Tracker(){


    const [profitData, setProfitData] = useState<TypeProfit[]>([])
    const [expenseData, setExpenseData] = useState<TypeExpense[]>([])
    const [totalExpensesValues, setTotalExpensesValues] = useState(0)
    const [totalProfitsValues, setTotalProfitsValues] = useState(0)

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImljYXJvIiwidXNlcm5hbWUiOiJpY2Fyb0B0ZXN0ZS5jb20iLCJpYXQiOjE2MjcwNzg0NDQsImV4cCI6MTYyNzE2NDg0NCwic3ViIjoiMzg4NjNiYmEtZTI5ZC00ZTE4LTg1NTgtNDZhNDUyM2Y4NWIzIn0.fBNx0DaGUeLUEVflmyMcvSd_0PhmNOQMLt519nBf8N8"

    useEffect(() => {
        fetchExpenses()
        fetchProfits()
    },[])


    function fetchExpenses(){
        Axios({
            method: "GET",
            url: "http://localhost:3003/expense/get-expenses",
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data.expensesData)
            setExpenseData(response.data.expensesData.expensesList)
            setTotalExpensesValues(response.data.expensesData.totalExpensesValues)
        })
    }

    function fetchProfits(){
        Axios({
            method: "GET",
            url: "http://localhost:3003/profit/get-profits",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(response => {
            setProfitData(response.data.profitsData.profitsList)
            setTotalProfitsValues(response.data.profitsData.totalProfitsValue)
        })
    }

    return(
        <>
            <div id="tracker-main">
                {/* <Chart options={chartOptions} series={chartSeries.series} width={500} height={350}></Chart> */}
                <div id="data-div">
                    <div id="total-data-div">
                        <div className="expense-profit-div" id="expense-div">
                            <MoneyOffIcon fontSize="large"/>
                            <h1 className="expense-profit-text">{totalExpensesValues}</h1>
                        </div>
                        <div className="expense-profit-div" id="profit-div">
                            <AttachMoneyIcon fontSize="large"/>
                            <h1 className="expense-profit-text">{totalProfitsValues}</h1>
                        </div>
                    </div>

                </div>
                <div id="chart-div">

                </div>
            </div>
        </>
    )
}