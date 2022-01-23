import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'


const RegionFilter = () => {
    
    const [country, setCountry] = useState([])
    const {regionname} = useParams()
    const [input, setInput] = useState('');

    useEffect(()=> {
        const FetchCountryData = async() => {

            const response = await fetch(`https://restcountries.com/v3.1/region/${regionname}`)
            const country = await response.json()
            setCountry(country)

        }
        FetchCountryData()
    }, [])
   
    return (
        <>   
        <Link to="/" className='btn'>Bring me back!</Link>

        <section className="filter">
            <form className="form-control">
                <input type="search" name="search" id="search" placeholder="Search for a country" onInput={e => setInput(e.target.value)}/>
            </form>
        </section>

        <h1 className='currentregion'>{regionname}</h1>
        <section className="grid">
            
        {country.filter(country =>{
            if (input === ""){
                return country;
            }else if (country.name.common.toLowerCase().includes(input.toLowerCase())){
                return country;
            }
        }).map((country, index)=> {
            const {name, flags, population, region } = country
            
            return(
                <article key={index}>
                    <div>
                        <div className='details'>
                        <img src={flags.png} alt={name.common} /><br />    
                        <h3 className='country-name'>{name.common}</h3>
                        <h4>Population: {population}</h4>
                        <h4>Region: {region}</h4>
                        <div className="buttons">
                        <Link to={`/countries/${name.common}`} className='btn'>Click for more details!</Link>
                       
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
export default RegionFilter
