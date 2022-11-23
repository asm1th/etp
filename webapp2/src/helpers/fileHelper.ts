import { IFileKP } from "../models/ISamp";


const createUint8Array = (hex: string) => {
    var iArrayBufferlength = hex.length / 2;
    var byteNumbars = new ArrayBuffer(iArrayBufferlength);
    var byteArray = new Uint8Array(byteNumbars);

    for (var n = 0; n < hex.length; n += 2) {
        byteArray[n / 2] = parseInt(hex.substr(n, 2), 16);
    }

    return byteArray;
}

export const getFile = (link_id: string, file: IFileKP) => {
    debugger
    const fileURL = `/NDI_EPCOMMON_D~gzpn~kp~service~rs~gazprom-neft.ru/rs/kp/link/${link_id}/docid/${file.file_docid}`;
    fetch(fileURL, {
        method: 'GET',
        headers: {
            'Content-Type': file.file_mime_type,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((data) => {
            const url = window.URL.createObjectURL(
                new Blob([createUint8Array(data.file_body)], { type: data.file_mime_type })
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                //file.file_name + '.' + file.file_type,
                file.file_name
            );
            document.body.appendChild(link);
            link.click();
            link.parentNode && link.parentNode.removeChild(link);
        })
        .catch((error) => {
            debugger
            alert("Ошибка скачки файла. Файл недоступен")
            console.log(error)
        });
}

export const binaryToString = (raw: any) => {
    var binary = '';
    var bytes = new Uint8Array(raw);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return binary;
}

export const convertBase64 = (arrayBuffer: any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arrayBuffer)
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}