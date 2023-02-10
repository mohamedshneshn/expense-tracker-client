import React from 'react'
import { Spin } from 'antd'
import '../resources/default-layout.css'

function Spinner() {
  return (
    <div className="spinner">
        <Spin size="large" />
    </div>
  )
}

export default Spinner