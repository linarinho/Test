import React, { useState } from 'react'
import ClientForm from './components/client-form/ClientForm'
import ClientTable from './components/client-table/ClientTable'
import styles from './styles.module.css'

export const AppComponent = () => {
  const [listData, setListData] = useState([]);

  return (
    <div className={styles.app}>
      <ClientForm data={listData} setData={setListData}/>
      <ClientTable data={listData} setData={setListData}/>
    </div>
  )
}
