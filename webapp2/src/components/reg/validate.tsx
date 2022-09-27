
export const validateTextFieldUtil = (prop: string, value: string, type: any) => {
    let result = false
    let msg = ""
    const minLen = 2
    let iffer = value && validateSymbols(value) && value.length >= minLen
    if (type === "onlyLetters") {
        iffer = value && validateSymbolsOnlyLetters(value) && value.length >= minLen
    }
    if (iffer) {
        result = true
        msg = ""
    } else {
        msg = "Ошибка! Допускаются только буквы. Минимум " + minLen + " буквы"
    }
    console.log("validateTextField:" + result)

    return { isValid: result, msg: msg }
}

export const validateSymbolsOnlyLetters = (txt: string) => {
    const reSpace = /^((?!\s{2}).)*$/;
    let result = false;
    if (reSpace.test(String(txt))) {
        //const re = /^[?!,'":@*—+«‎»()\\/\-_.а-яА-ЯёЁ0-9a-zA-Z\s]+$/;
        const re = /^[?!,'":@*—+«‎»()\\/\-_.а-яА-ЯёЁa-zA-Z\s]+$/;
        if (re.test(String(txt))) {
            result = true;
        } else {
            result = false;
        }
        console.log("validateInput:" + result);
    } else {
        result = false;
    }
    return result;
}

export const validateSymbols = (txt: string) => {
    const reSpace = /^((?!\s{2}).)*$/;
    let result = false;
    if (reSpace.test(String(txt))) {
        const re = /^[?!,'":@*—+«‎»()\\/\-_.а-яА-ЯёЁ0-9a-zA-Z\s]+$/;
        if (re.test(String(txt))) {
            result = true;
        } else {
            result = false;
        }
        console.log("validateInput:" + result);
    } else {
        result = false;
    }
    return result;
}

export const validateEmailUtil = (email:string) => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let msg = ""
    let result = false

    if (re.test(String(email).toLowerCase())) {
        result = true
        msg = ""
    } else {
        msg = "Ошибка! Формат: example@email.com"
    }
    console.log("validateEmail:" + result)

    return { isValid: result, msg: msg }
}