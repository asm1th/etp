// TODO сделать универсальный компонент


import React, { useState, useEffect } from "react";
import { Text } from "@consta/uikit/Text";
import { Modal } from '@consta/uikit/Modal';
import { Button } from '@consta/uikit/Button';

const ModalFZ = ({stateChanger, ...isModalOpen}:any, props:{isModalOpen:any}) => {
    
    //const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(()=>{
    //     console.log('something prop has changed.')
    //     debugger
    //     stateChanger(props.isModalOpen)
    // },[props.isModalOpen]);

    return (
        <>
            <Modal
                isOpen={props.isModalOpen}
                hasOverlay
                onClickOutside={() => stateChanger(false)}
                onEsc={() => stateChanger(false)}
            >
                <Text as="p" size="s" view="secondary">
                    Это заголовок модального окна
                </Text>
                <Text as="p" size="m" view="primary">
                    Это содержимое модального окна. Здесь может быть что угодно: текст, изображение, форма или
                    таблица. Всё, что хочется вынести из контекста и показать поверх основной страницы.
                </Text>
                <div className="jcfe">
                    <Button
                        size="s"
                        view="primary"
                        label="Закрыть"
                        width="default"
                        onClick={() => stateChanger(false)}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ModalFZ;

