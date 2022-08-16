import React, { useEffect } from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { useAppDispatch } from '../hook/redux';
//import {fetchOffers} from '../store/actions/offerActions';

export function Dashboard() {
    const dispatch = useAppDispatch()

    // useEffect(()=>{
    //     dispatch(fetchOffers())
    // }, [])

    return (
        <>
            12321
        </>
    );
}

