import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input, Select, Table , Space , DatePicker} from "antd";
import  axios  from "axios";
import "../resources/transactions.css";
import moment from "moment";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";

import Analatics from "../components/Analatics";

const { RangePicker } = DatePicker;

function Home() {
  const navigate = useNavigate();
  const [form] = Form.useForm(); //to use form
  const [showAddEditModal, setShowAddEditModal] = React.useState(false); //to show add transaction modal
  const [showDeleteModal, setShowDeleteModal] = React.useState(false); //to show delete transaction modal
  
  const [transactionsData , setTransactionsData] = React.useState([]); //to store all transactions then show them in table
  const [customDate, setCustomDate] = React.useState(30); //to store custom date 1 week, 1 month, 3 months, 6 months, 1 year
  const [selectedCustomDate, setSelectedCustomDate] = React.useState([]); //to store custom date range
  const [customType , setCustomType] = React.useState("all"); //to store custom type income, expense, all
  const [viewType, setViewType] = React.useState("table"); //to store view type table, chart
  const [editData, setEditData] = React.useState(null); //to store data of transaction to edit

  const [recordDelete, setRecordDelete] = React.useState(null); //to store data of transaction to delete
 const [url, setUrl] = React.useState("http://localhost:5002/");
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    console.log("development");
    setUrl("http://localhost:5002/");
    
  } else {
    // production code
    setUrl("https://expense-tracker-v1.adaptable.app/");
    console.log("production");
  }


  

  const onFinish = (values) => {      //to add transaction to database
    const user = JSON.parse(localStorage.getItem("token"));

    if(editData) {
      
      
      axios.post( url+"transactions/edit-transaction", { ...values, user_id: user._id, _id: editData._id })
      .then ((res) => {  message.success("Transaction updated successfully"); getTransactions();  setShowAddEditModal(false);  })
      .catch((err) => console.log(err));
      
    } else {
      axios.post(url+"transactions/add-transaction", { ...values, user_id: user._id })
      .then ((res) => { message.success("Transaction added successfully"); getTransactions(); setEditData(null);  setShowAddEditModal(false);  })
      .catch((err) => console.log(err));
     
    }
   
  

  };

  const getTransactions = () => {            //to get all transactions from database for a particular user
    const user = JSON.parse(localStorage.getItem("token"));
    axios.post(url+"transactions/user-transactions", { user_id: user._id , customDate, selectedCustomDate , customType})
    .then((res) =>  { setTransactionsData(res.data);  })
    .catch((err) => message.error("Something went wrong"));
  };

  const deleteTransaction = (id) => {   //to delete a transaction from database
    const user = JSON.parse(localStorage.getItem("token"));
    axios.post(url+"transactions/delete-transaction", { _id: id, user_id: user._id })
    .then((res) => { message.success("Transaction Deleted Successfully"); getTransactions(); })
    .catch((err) => message.error("Something went wrong"));
   
  };


const setInitialValues = () => {   //to set initial values of form
  if(editData) {
    form.setFieldsValue({ ...editData });
  } else {
    form.setFieldsValue({ amount: "", type: "", category: "", date: "", reference: "", description: "" });
  }
}


  
  useEffect(() => {                        // to check if user is logged in or not and to get all transactions from database for a particular user
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getTransactions();
      setInitialValues();

   
    }
    
   
    // eslint-disable-next-line
  }, [customDate, selectedCustomDate, customType, editData,form]); 



//this columns are for table view
const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render:   (text) => <span>{moment.utc(text).format("MM/DD/YYYY")}</span>
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined  onClick={() => {  setShowAddEditModal(true); setEditData({...record, date: moment(record.date).format("YYYY-MM-DD")}) }} />
          <DeleteOutlined  onClick={() =>  { setShowDeleteModal(true);     setRecordDelete(record ) }} />
        </Space>
      ),
    
    },
  ];


  return (
    <DefaultLayout>
      <div className="filter d-flex justify-content-between align-items-center">
          <div className="filter-item d-flex  space-between">
             <div className="d-flex  flex-column">
                 <h6>Select Date Range</h6>
                  <Space wrap>
                    <Select
                      defaultValue="30"
                      style={{ width: 150 }}
                      onChange={(value) => setCustomDate(value)}
                      options={[
                        {
                          value: "7",
                          label: "Last 1 Week", 
                        },
                        {
                          value: "30",
                          label: "Last 1 Month",
                        },
                        {
                          value: "90",
                          label: "Last 3 Months",
                        },
                        {
                          value: "365",
                          label: "Last 1 Year",
                          
                        },
                        {
                          value: "custom",
                          label: "Custom",
                        },
                      ]}
                    />
                 </Space>
                   {customDate === "custom" && ( 
                     <Space direction="vertical"  className="mt-2">
                     <RangePicker value={selectedCustomDate} onChange={(value) => setSelectedCustomDate(value) } />
                    </Space>
                     )}
             </div>
             <div className="d-flex  flex-column mx-5">      
                  <h6>Select Type </h6>
                      <Space wrap>
                        <Select
                          defaultValue="all"
                          style={{ width: 100}}
                          value = {customType}
                          onChange={(value) => setCustomType(value)}
                          options={[
                            {
                              value: "all",
                              label: "All", 
                            },
                            {
                              value: "income",
                              label: "Income",
                            },
                            {
                              value: "expense",
                              label: "Expense",
                            }
                            
                          ]}
                        />
                      </Space>
             </div>
           </div>
          <div className="filter-item d-flex  space-between">
               <div className="view-switch d-flex   align-items-center justify-content-between   mx-5">
                 <UnorderedListOutlined className="mx-2" style={{fontSize: "30px"}}  value = {viewType} onClick={() => setViewType("table")}/>
                 <AreaChartOutlined className="mx-2" style={{fontSize: "30px"}} value = {viewType} onClick={() => setViewType("chart")}/>
              </div>
              <div >
              <button className="btn btn-primary" onClick={() => {  setEditData(null); setInitialValues(); setShowAddEditModal(true);   }}>Add Transaction</button>
              </div>
           </div>
      </div>  

      <div className="table-analtics">
        {viewType === "table" && (
          <div className="table">
            <Table columns={columns} dataSource= {transactionsData}  rowKey="_id"  size="small" />
          </div>
        )}
        {viewType === "chart" && (
          <div className="chart">
            <Analatics  transactionsData={transactionsData} />
          </div>
        )}

       
      </div>


      <Modal  
              title={editData ? "Edit Transaction" : "Add Transaction"}
              forceRender
              open={showAddEditModal} 
              onCancel={() =>{  setShowAddEditModal(false);   }}
              onOk={() => { setShowAddEditModal(false);  }}
              
              footer={null}>
         <Form layout="vertical"  onFinish={onFinish} form={form} initialValues={editData}>

         <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please input your amount!" }]}>
            <Input />
          </Form.Item>
          
          <Form.Item label="Type" name="type" rules={[{ required: true, message: "Please input your type!" }]} >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please input your category!" }]}>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="entertainment">Enterainment</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please input your date!" }]}>
            <Input  type="date"  />
          </Form.Item>

          <Form.Item label="Reference" name="reference" rules={[{ required: true, message: "Please input your reference!" }]}>
            <Input  type="text"    />
          </Form.Item>

          <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input your description!" }]}>
            <Input type="text" />
          </Form.Item>

           <div className="d-flex justify-content-end">
            <button className="btn btn-primary mx-2" onClick={() => {   setShowAddEditModal(false);   }}>Cancel</button>
            <button className="btn btn-primary">Submit</button>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Delete Transaction"
        forceRender
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={() => setShowDeleteModal(false)}
        footer={null}
      >
        <p>Are you sure you want to delete this transaction?</p>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mx-2" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => { deleteTransaction( recordDelete._id); setShowDeleteModal(false);  }}>
            Delete
          </button>
        </div>
      </Modal>
    </DefaultLayout>
  );
}

export default Home;
