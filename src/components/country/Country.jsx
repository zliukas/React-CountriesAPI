import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const Country = () => {

    const [country, setCountry] = useState([])
    const {name} = useParams()

    useEffect(()=> {
        const fethcountrydata = async() => {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
            const country = await response.json()
            setCountry(country)
        }
        fethcountrydata()
    }, [])

    return (
        <div className='countrydata'>
        <Link to={"/"} className='btn backbtn'>Back</Link>
        <section>
            {country.filter(country =>{
                if (name === ""){
                    return country;
                }else if (country.name.common.toLowerCase()===(name.toLowerCase())){
                    return country;
                }
            }).map((c, index) => {
                    const {name, capital, timezones, continents,independent, population, area, flags} = c

                return(
                    <article key={index} >
                        <div className='titlename'><h2>{name.common}</h2></div>
                        <div className='flag'>
                            <img src={flags.png} alt={name.common} />
                        </div>
                        <div className='country-details'>
                            <h5>Continent: {continents}</h5>
                            <h5>Population: {population}</h5>
                            <h5>Capital: {capital}</h5>
                            <h5>Timezone: {timezones}</h5>
                            <h5>Area: {area} km</h5>
                            <h5>Currency: {
                                country[index].currencies ? Object.keys(country[0].currencies).map((key)=>{
                                return ( <span>{country[0].currencies[key].name}</span>) 
                            }): "no data" 
                            }
                            </h5>
                            <h5>Language: {
                            country[0].languages ? Object.keys(country[0].languages).map((key)=>{
                                return(country[0].languages[key]+" " )
                            }): "no data"
                            }
                            </h5>
                            <h5>Borders: {
                                country[0].borders ? Object.keys(c.borders).map((key)=>{
                                    return(c.borders[key]+" ")
                                }): "no data"
                            }</h5>
                        </div>
                 </article>
                )
            })}
        </section>
     </div>
   )
}
export default Country
