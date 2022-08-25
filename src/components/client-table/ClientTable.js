import React from 'react'
import global_styles from './../../styles.module.css'
import styles from './ClientTable.css'
import image from '../../../example/public/delete.png'
import { BuildData } from './BuildData'
import { serviceCreateClient } from '../../services/GetData'

const ClientTable = ({ data, setData }) => {
    const auxImg = image.split('~zZmFPWMU');
    const img = auxImg[0] + auxImg[1];

    const deleteClient = (pos) => {
        let aux = [];
        data.forEach(element => aux.push(element))
        aux.splice(pos, 1);
        setData(aux);
    }

    const saveData = async () => {
        if (data.length > 0) {
            const buildData = BuildData(data);
            const response = await serviceCreateClient(buildData);
            alert(response.message)
        }
    }

    return (
        <div className={global_styles.container_test}>
            <div className={global_styles.test_header}>
                <span>Lista de Clientes</span>
            </div>

            <div className={global_styles.test_body}>
                <table>
                    <thead>
                        <tr>
                            <th>Rut</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Patente</th>
                            <th>Moneda Indemniza</th>
                            <th>Total a pagar</th>
                            <th>Comuna</th>
                            <th>Ciudad</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((client, index) => {
                            return <tr key={index}>
                                <td>{client.rut}</td>
                                <td>{client.nombre}</td>
                                <td>{client.email}</td>
                                <td>{client.patente}</td>
                                <td>{client.monedaName}</td>
                                <td>{client.total_pagar}</td>
                                <td>{client.comunaName}</td>
                                <td>{client.ciudad}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <img src={img} alt='' onClick={() => deleteClient(index)} width={20} style={{ cursor: 'pointer' }}></img>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <div className={global_styles.test_footer}>
                <button className={global_styles.color_bleue} onClick={saveData}>Grabar</button>
            </div>
        </div>

    )
}

export default ClientTable;
