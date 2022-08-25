

export function formato_rut(srut) {
    if (srut == null || srut == 0) {
        return "";
    }

    var cont = 0;
    var formato;

    srut = srut.split('.').join('');
    srut = srut.split('-').join('');

    var regex = /^(\d*)[k|K|0-9]{1}$/;

    if (srut.length == 0) {
        return "";
    } else if (srut.length > 1 && regex.test(srut)) {
        formato = "-" + srut.substring(srut.length - 1);
        for (var i = srut.length - 2; i >= 0; i--) {
            formato = srut.substring(i, i + 1) + formato;
            cont++;
            if (cont == 3 && i != 0) {
                formato = "." + formato;
                cont = 0;
            }
        }
        return formato;
    } else {
        return regex.test(srut) ? srut : formato_rut(srut.substring(0, srut.length - 1));
    }
}

export function valida_email(email) {
    if (email.length > 0) {
        //var regex = /^[a-zA-ZñÑ0-9\+\.\_\%\-\+]{1,256}\@[a-zA-ZñÑ0-9][a-zA-ZñÑ0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{1,25})+$/;
        var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (regex.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    return true;
}

export function valida_patente(patente) {
    if (patente.length > 0) {
        var regex = /^[a-z]{2}[\.\- ]?[0-9]{2}[\.\- ]?[0-9]{2}|[b-d,f-h,j-l,p,r-t,v-z]{2}[\-\. ]?[b-d,f-h,j-l,p,r-t,v-z]{2}[\.\- ]?[0-9]{2}$/i;
        if (regex.test(patente)) {
            return true;
        } else {
            return false;
        }
    }

    return true;
}

export function valida_rut(rut) {

    rut = rut.split('.').join('');
    rut = rut.split('-').join('');

    //Valor acumulado para el calculo de la formula
    var nAcumula = 0;
    //Factor por el cual se debe multiplicar el valor de la posicion
    var nFactor = 2;
    //Digito verificador
    var nDv = 0;
    var nDvReal;
    //extraemos el ultimo numero o letra que corresponde al verificador
    //La K corresponde a 10
    if (rut.charAt(rut.length - 1).toUpperCase() == 'K')
        nDvReal = 10;
    //el 0 corresponde a 11
    else if (rut.charAt(rut.length - 1) == 0)
        nDvReal = 11;
    else
        nDvReal = rut.charAt(rut.length - 1);
    for (var nPos = rut.length - 2; nPos >= 0; nPos--) {
        nAcumula += rut.charAt(nPos).valueOf() * nFactor;
        nFactor++;
        if (nFactor > 7) nFactor = 2;
    }

    nDv = 11 - (nAcumula % 11)
    if (nDv == nDvReal) {
        return true;
    } else {
        return false;
    }
}

export function formato_texto(valor) {
    var regex = /[^a-zA-ZñÑáàéèíìóòúùüÁÀÉÈÍÌÓÒÚÙÜ\.\-\s]/i; // para texto sin espacios usar: /^[a-zA-Z]*$/
    if (!regex.test(valor)) {
        return valor;
    } else {
        return formato_texto(valor.substring(0, valor.length - 1));
    }
}

export function formato_monto(valor, aceptaNegativos) {
    console.log(valor)
    if (aceptaNegativos == null) aceptaNegativos = false;

    if (valor == null) {
        return "";
    }

    valor = valor.toString().split('.').join('');
    var cont = 0;
    var formato = "";
    var regex = aceptaNegativos ? /^\-?\d*$/ : /^\d*$/;

    if (valor.length == 0) {
        return "";
    } else if (valor.length > 1 && regex.test(valor)) {
        let negativo = valor.startsWith("-");
        if (aceptaNegativos && negativo) valor = valor.substring(1);

        for (var i = valor.length - 1; i >= 0; i--) {
            formato = valor.substring(i, i + 1) + formato;
            cont++;
            if (cont == 3 && i != 0) {
                formato = "." + formato;
                cont = 0;
            }
        }

        if (aceptaNegativos && negativo) formato = "-" + formato;
        return formato;
    } else {
        return regex.test(valor) ? valor : formato_monto(valor.substring(0, valor.length - 1));
    }
}



