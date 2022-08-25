import React, { useEffect, useState } from 'react'
import { formato_monto, formato_rut, formato_texto, valida_email, valida_patente, valida_rut } from '../../reusables/validations'
import { money, onlyLetter } from '../../reusables/keyEvent'
import { serviceGetComunas, serviceGetMonedas } from '../../services/GetData'
import global_styles from './../../styles.module.css'
import styles from './ClientForm.css'

const ClientForm = ({ data, setData }) => {
  const [fields, setFields] = useState({
    rut: '',
    nombre: '',
    email: '',
    patente: '',
    moneda_ind: '',
    total_pagar: '',
    comuna: '',
    ciudad: '',
  })

  const [errors, setErrors] = useState({
    rut: { state: '', message: '' },
    nombre: { state: '', message: '' },
    email: { state: '', message: '' },
    patente: { state: '', message: '' },
    moneda_ind: { state: '', message: '' },
    total_pagar: { state: '', message: '' },
    comuna: { state: '', message: '' },
    ciudad: { state: '', message: '' },
  })
  const [listMonedas, setListMonedas] = useState([]);
  const [listComunas, setListComunas] = useState([]);

  useEffect(() => {
    const getMonedas = async () => {
      const response = await serviceGetMonedas();
      setListMonedas(response.object);
    }

    const getComunas = async () => {
      const response = await serviceGetComunas();
      setListComunas(response.object);
    }

    getMonedas();
    getComunas();
  }, [])

  const handleChange = (type, value) => {
    setFields({ ...fields, [type]: value });

    if (type === 'rut') {
      setFields({ ...fields, [type]: formato_rut(value) });
    }
    else if (type === 'nombre') {
      setFields({ ...fields, [type]: formato_texto(value) });
    }
    else if (type === 'moneda_ind') {
      setFields({ ...fields, [type]: value, total_pagar: '' });
    }

    if (type === 'comuna') {
      if (value === "") {
        setFields({ ...fields, [type]: '', ciudad: '' });
        setErrors({ ...errors, ciudad: { state: 'Invalid', message: 'This value is required.' } });
      } else {
        const city = listComunas.filter(com => com.id === value)[0].atr4;
        setFields({ ...fields, [type]: value, ciudad: city });
        setErrors({ ...errors, ciudad: { state: 'Valid', message: '' } });
      }

    }

    setErrors(state => {
      if (value === '' || value === undefined) {
        state[type] = { state: 'Invalid', message: 'This value is required.' };
      }
      else {
        if (type === 'email') {
          if (valida_email(value))
            state[type] = { state: 'Valid', message: '' }
          else
            state[type] = { state: 'Invalid', message: 'Email invalido.' }
        }
        else if (type === 'patente') {
          if (valida_patente(value))
            state[type] = { state: 'Valid', message: '' }
          else
            state[type] = { state: 'Invalid', message: 'Patente invalida.' }
        }
        else
          state[type] = { state: 'Valid', message: '' };
      }

      return state;
    })

  }

  const handleValidRut = (type, value) => {
    const valid = valida_rut(value)

    if (valid)
      setErrors({ ...errors, [type]: { state: 'Valid', message: '' } });
    else
      setErrors({ ...errors, [type]: { state: 'Invalid', message: 'Rut invalido.' } });
  }

  const handleFormatMonto = (type, value) => {
    if (value !== "") {
      let format = "";

      if (fields.moneda_ind === "30002")
        format = new Intl.NumberFormat('de-DE').format(parseFloat(value).toFixed(2));
      else
        format = formato_monto(value, false)

      setFields({ ...fields, [type]: format });
    }
  }

  const handleFocus = (type) => {
    if (fields[type] !== "") {
      let regex = "";

      if (fields.moneda_ind === "30002")
        regex = fields[type].replace(/[.\s]/g, '').replace(/[,\s]/g, '.');
      else
        regex = fields[type].replace(/[.\s]/g, '');

      setFields({ ...fields, [type]: regex });
    }
  }

  const validateSubmit = () => {
    let isValid = 0;
    let validate = {};

    Object.keys(fields).forEach(value => {
      if (fields[value] === '' || fields[value] === undefined) {
        isValid++;
        validate[value] = { state: 'Invalid', message: 'This value is required.' }
      } else {
        if (errors[value]?.state === 'Invalid') {
          isValid++;
          validate[value] = { state: errors[value].state, message: errors[value].message };
        }
        else
          validate[value] = { state: 'Valid', message: '' };
      }
    })

    setErrors(validate);
    return (isValid === 0);
  }

  const clearFiels = () => {
    let field = {};
    let error = {};

    Object.keys(fields).forEach(value => {
      if (value !== "comunaName" && value !== "monedaName") {
        field[value] = '';
        error[value] = { state: '', message: '' };
      }
    })

    setFields(field)
    setErrors(error);
  }

  const handleSubmit = () => {
    let isValid = validateSubmit();
    
    if (isValid) {
      let objectResult = fields;
      objectResult.monedaName = listMonedas.filter(moneda => moneda.id === Number(fields.moneda_ind))[0].nombre;
      objectResult.comunaName = listComunas.filter(comuna => comuna.id === fields.comuna)[0].nombre;

      setData([...data, objectResult]);
      clearFiels();
    }
  }

  return (
    <div className={global_styles.container_test}>
      <div className={global_styles.test_header}>
        <span>Ingreso Cliente</span>
      </div>

      <div className={global_styles.test_body}>
        <div className={styles.container_form}>
          <div className={styles.container_input}>
            <label className={global_styles.is_required}>Rut Cliente</label>
            <input
              type='text'
              name='rut'
              minLength={10}
              maxLength={20}
              value={fields.rut}
              className={errors.rut.state === 'Invalid' ? 'invalid' : ''}
              onBlur={(e) => handleValidRut('rut', e.target.value)}
              onChange={(e) => handleChange('rut', e.target.value)}>
            </input>
            <span>{errors.rut.message}</span>
          </div>
          <div className={styles.container_input}>
            <label className={global_styles.is_required}>Nombre</label>
            <input
              type='text'
              name='nombre'
              value={fields.nombre}
              className={errors.nombre.state === 'Invalid' ? 'invalid' : ''}
              onChange={(e) => handleChange('nombre', e.target.value)}
              onKeyPress={(e) => onlyLetter(e, true)}>
            </input>
            <span>{errors.nombre.message}</span>
          </div>
          <div className={styles.container_input}>
            <label className={global_styles.is_required}>Email</label>
            <input
              type='text'
              name='email'
              value={fields.email}
              className={errors.email.state === 'Invalid' ? 'invalid' : ''}
              onChange={(e) => handleChange('email', e.target.value)}>
            </input>
            <span>{errors.email.message}</span>
          </div>
          <div className={styles.container_input}>
            <label className={global_styles.is_required}>Patente</label>
            <input
              type='text'
              name='patente'
              value={fields.patente}
              className={errors.patente.state === 'Invalid' ? 'invalid' : ''}
              onChange={(e) => handleChange('patente', e.target.value)}>
            </input>
            <span>{errors.patente.message}</span>
          </div>
        </div>
        <div className={styles.container_form}>
          <div className={styles.container_input}>
            <label className={global_styles.is_required}>Moneda Indemniza</label>
            <select
              className={errors.moneda_ind.state === 'Invalid' ? 'invalid' : ''}
              value={fields.moneda_ind}
              onChange={(e) => handleChange('moneda_ind', e.target.value)} >
              <option value="">Seleccione</option>
              {
                listMonedas.map((value, key) => {
                  return <option value={value.id} key={key}>{value.nombre}</option>
                })
              }
            </select>
            <span>{errors.moneda_ind.message}</span>
          </div>
          <div className={styles.container_input}>
            <label className={global_styles.is_required}>Total a pagar</label>
            <input
              disabled={fields.moneda_ind === ""}
              type='text'
              name='total_pagar'
              value={fields.total_pagar}
              className={errors.total_pagar.state === 'Invalid' ? 'invalid' : ''}
              onBlur={(e) => handleFormatMonto('total_pagar', e.target.value)}
              onFocus={() => handleFocus('total_pagar')}
              onKeyPress={(e) => money(e)}
              onChange={(e) => handleChange('total_pagar', e.target.value)}>
            </input>
            <span>{errors.total_pagar.message}</span>
          </div>
          <div className={styles.container_input}>
            <label className={global_styles.is_required}>Comuna</label>
            <select
              value={fields.comuna}
              className={errors.comuna.state === 'Invalid' ? 'invalid' : ''}
              onChange={(e) => handleChange('comuna', e.target.value)}>
              <option value="">Seleccione</option>
              {
                listComunas.map((value, key) => {
                  return <option value={value.id} key={key}>{value.nombre}</option>
                })
              }
            </select>
            <span>{errors.comuna.message}</span>
          </div>
          <div className={styles.container_input}>
            <label className={global_styles.is_required}>Ciudad</label>
            <input
              disabled
              type='text'
              name='ciudad'
              value={fields.ciudad}
              className={errors.ciudad.state === 'Invalid' ? 'invalid' : ''}>
            </input>
            <span>{errors.ciudad.message}</span>
          </div>
        </div>
      </div>

      <div className={global_styles.test_footer}>
        <button className={global_styles.color_red} onClick={clearFiels}>Limpiar</button>
        <button className={global_styles.color_bleue} onClick={handleSubmit}>Agregar Cliente</button>
      </div>
    </div>
  )
}

export default ClientForm;