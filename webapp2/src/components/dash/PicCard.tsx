import React from "react";
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/Layout";
import { Link } from "react-router-dom";
import './PicCard.css'
import card1 from "../../assets/img/dash/card1.png";
import card2 from "../../assets/img/dash/card2.png";
import card3 from "../../assets/img/dash/card3.png";
import card4 from "../../assets/img/dash/card4.png";
import card5 from "../../assets/img/dash/card1.png";
import card6 from "../../assets/img/dash/card2.png";

const pics = [
    card1, card2, card3, card4, card5, card6
] 

const PicCard = (props: { id: number, label: string, url: string, pic: string }) => {

    return (
        <>
            <Link 
                to={props.url} 
                className="picCard">
                <Layout 
                    direction="column" 
                    className="picCardBody" 
                    style={{backgroundImage: `url(${pics[props.id]})` }}>
                    <Text 
                        className="picCardLabel">
                            {props.label}
                    </Text>
                </Layout>
            </Link>
        </>
    );
};

export default PicCard;