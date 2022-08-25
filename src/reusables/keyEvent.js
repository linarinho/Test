
export const onlyLetter = (e, space) => {
    var keyCode = e.keyCode === 0 ? e.charCode : e.keyCode;
    var ret = (
        (keyCode >= 65 && keyCode <= 90) ||
        (keyCode >= 97 && keyCode <= 122) ||
        (keyCode === 32 && space)
    );
    if (!ret) {
        e.preventDefault();
    }
}

export const money = (e, space = false) => {
    var keyCode = e.keyCode === 0 ? e.charCode : e.keyCode;
    var ret = (
        (keyCode >= 65 && keyCode <= 90) ||
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode === 46) || (keyCode === 9) || (keyCode === 44) ||
        (keyCode === 32 && space)
    );
    if (!ret) {
        e.preventDefault();
    }
}