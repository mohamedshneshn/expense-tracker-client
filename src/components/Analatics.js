import React from 'react'
import { Progress, Space } from 'antd';

function Analatics(props) {

    console.log(props.transactionsData);
    const totalTransactions = props.transactionsData.length;
    const totalIncomeTransactions = props.transactionsData.filter((transaction) => transaction.type === "income").length;
    const totalExpenseTransactions = props.transactionsData.filter((transaction) => transaction.type === "expense").length;
    const totalIncomeTransactionsPercentage = ((totalIncomeTransactions / totalTransactions) * 100).toFixed(0);
    const totalExpenseTransactionsPercentage = ((totalExpenseTransactions / totalTransactions) * 100).toFixed(0);

    const totalTransactionsAmount = props.transactionsData.reduce((acc, transaction) => (acc += transaction.amount), 0).toFixed(2);
    const totalIncomeTransactionsAmount = props.transactionsData.filter((transaction) => transaction.type === "income").reduce((acc, transaction) => (acc += transaction.amount), 0).toFixed(2);
    const totalExpenseTransactionsAmount = props.transactionsData.filter((transaction) => transaction.type === "expense").reduce((acc, transaction) => (acc += transaction.amount), 0).toFixed(2);
    const totalIncomeTransactionsPercentageAmount = ((totalIncomeTransactionsAmount / totalTransactionsAmount) * 100).toFixed(0);
    const totalExpenseTransactionsPercentageAmount = ((totalExpenseTransactionsAmount / totalTransactionsAmount) * 100).toFixed(0);

    const catogries = [ "salary","freelance","food","entertainment","education","medical","tax"];
  
  return (
    <div className="analatics">
        <div className="row">
            <div className="col-md-6">
                <div className="transaction-card card my-3 p-3">
                    <h5>Total Transactions: {totalTransactions}</h5>
                    <hr />
                    <h5>Income : {totalIncomeTransactions}</h5>
                    <h5>Expense: {totalExpenseTransactions}</h5>

                    <div className="progress-container mx-auto">
                        <Space direction="horizontal" className='mt-2'>
                            <Progress percent={totalIncomeTransactionsPercentage}  type="circle" strokeColor="#52c41a" />
                            <Progress percent={totalExpenseTransactionsPercentage}  type="circle" strokeColor="#f5222d" />
                        </Space>
                        </div>

                </div>

            </div>
            <div className="col-md-6">
                <div className="transaction-card card my-3 p-3">
                    <h5>Total Turnover: {totalTransactionsAmount}</h5>
                    <hr />
                    <h5>Income : {totalIncomeTransactionsAmount}</h5>
                    <h5>Expense: {totalExpenseTransactionsAmount}</h5>

                    <div className="progress-container mx-auto">
                        <Space direction="horizontal" className='mt-2'>
                            <Progress percent={totalIncomeTransactionsPercentageAmount}  type="circle" strokeColor="#52c41a" />
                            <Progress percent={totalExpenseTransactionsPercentageAmount}  type="circle" strokeColor="#f5222d" />
                        </Space>
                        </div>

                </div>

            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <h5>Income Catogrory-wise</h5>
                {catogries.map((catogry) => {
                    const totalCatogryAmount = 
                    props.transactionsData
                    .filter((transaction) => (transaction.type === "income"  && transaction.category === catogry))
                    .reduce((acc, transaction) => (acc += transaction.amount), 0)
                    .toFixed(2);
                    console.log(totalCatogryAmount);
                    return (
                       totalCatogryAmount > 0 && <div className="transaction-card card my-3 p-3">
                            <h5>{catogry} : {totalCatogryAmount}</h5>
                            < Progress percent={((totalCatogryAmount / totalIncomeTransactionsAmount) * 100).toFixed(0)} strokeColor="#52c41a" />
                            
                        </div>
                    );
                }
                )}

                </div>
            <div className="col-md-6">
                  <h5>Expense Catogrory-wise</h5>
                  {catogries.map((catogry) => {
                    const totalCatogryAmount = 
                    props.transactionsData
                    .filter((transaction) => (transaction.type === "expense"  && transaction.category === catogry))
                    .reduce((acc, transaction) => (acc += transaction.amount), 0)
                    .toFixed(2);
                  
                    return (
                       totalCatogryAmount > 0 && <div className="transaction-card card my-3 p-3">
                            <h5>{catogry} : {totalCatogryAmount}</h5>
                            < Progress percent={((totalCatogryAmount / totalExpenseTransactionsAmount) * 100).toFixed(0)}    strokeColor="#f5222d" />
                            
                        </div>
                    );
                }
                )}
                </div>
         </div>
                                 

    </div>
  )
}

export default Analatics