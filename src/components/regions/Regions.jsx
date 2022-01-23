import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


const Regions = () => {
    
    const [countries,SetCountries] = useState([])

    const FetchCountryData = async() => {
        const response = await fetch(`https://restcountries.com/v3.1/all`)
        const countries = await response.json()
        SetCountries(countries)

        } 
        useEffect(() => {
            FetchCountryData()
         }, [])
        const allcontinents = countries
        const uniqueTags = [];
           
        allcontinents.map(img => {
        if (uniqueTags.indexOf(img.continents) === -1) {
            uniqueTags.push(img.continents)
        }
        });
            const arrays = []
            for (let i = 0; i < 249; i++){
                if (uniqueTags[i] !== undefined) {
                    if (uniqueTags[i][0] === "Antarctica")
                    {
                        uniqueTags[i][0] = "Antarctic"
                    }
                    arrays.push(uniqueTags[i][0])
                }
            }
            const array = arrays.map(q => q);
            return (
                <>
                    {array.filter((q, idx) => array.indexOf(q) === idx).map((item, index) => {return <Link to={"/region/"+item} className='btn btntop' key={index}>{item}</Link>})} 
                </>
         )
}
export default Regions
