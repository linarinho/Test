
export const BuildData = (data) => {
    let arr = [];

    data.forEach(item => {
        const obj = {
            "rut": item.rut,
            "nombre": item.nombre,
            "email": item.email,
            "patente": item.patente,
            "mondea": item.moneda_ind,
            "total": item.total_pagar,
            "comuna": item.comuna,
            "ciudad": item.ciudad,
        }

        arr.push(obj);
    });

    return arr;
}