import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {fetchOffers} from '../store/actions/offerActions';

export function Dashboard() {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchOffers)
    }, [])

    return (
        <>
            12321
        </>
    );
}
