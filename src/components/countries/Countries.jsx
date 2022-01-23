import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Countries = () => {
    
    const [resourcetype, setResourcetype] = useState("all")
    const [countries, SetCountries] = useState([])

    const FetchCountryData = async() => {
        const response = await fetch(`https://restcountries.com/v3.1/${resourcetype}`)
        const countries = await response.json()
        SetCountries(countries)
    } 
    useEffect(() => {
     FetchCountryData()
    }, [])

    const [input, setInput] = useState('');
    return (
        <>
        <section className="filter">
            <form className="form-control">
                <input type="search" name="search" id="search" placeholder="Search any country!" onInput={e => setInput(e.target.value)}/>
            </form>
        </section>

        <section className="grid">
        {countries.filter(country =>{
            if (input === ""){
              return country;
            }else if (country.name.common.toLowerCase().includes(input.toLowerCase())){
               return country;
            }
            }).map( (country, index)=> {

            const {name, flags, population, region} = country
            return(
                <article key={index} id={(name.common)}>
                    <div>
                        <div className='details'>
                            <img src={flags.png} alt={name.common} /><br />    
                                <h3 className='country-name'>{name.common}</h3>
                                <h4>Population: {population}</h4>
                                <h4>Region: {region}</h4>

                                    <div className="buttons">
                                        <Link to={`/countries/${name.common}`} className='btn'>Click for more details</Link>
                                    </div>
                        </div>
                    </div>
                </article>
                 )
             })}
        </section>
    </>
  )
}
export default Countries