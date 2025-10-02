import React from 'react'
import { HeroSection } from '../Conponents/HeroSection'
import { FeaturedCategories } from '../Conponents/FeaturedCategories'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { baseUrl } from '../lib/base'
import { Loader } from '../Conponents/Loader'
import { addItems } from '../Store/dashSlice'


const Dashboard = () => {
    const dispatch = useDispatch()
    const selector = useSelector(store => store.dashData.items);

    const getDashboardData = async () => {
        try{
            const res = await axios.get(baseUrl+"/scheme/dashboard", {
                withCredentials: true,
            });
            console.log(res);
            dispatch(addItems(res.data))

        }catch(error){
            console.error(error);
        }
    }
    useEffect(() => {
        if(selector == null){
            getDashboardData();
        }
    }, [])
    console.log(selector)
  return (
    <div>
        <HeroSection />
        {selector ? 
        <FeaturedCategories /> :<Loader />
}
    </div>
  )
}

export default Dashboard