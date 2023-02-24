import React, { useState, useEffect } from "react";
import './Map.scss'
import Station from '../Station/Station'
import {fetchData} from "../../fetchapis"
import Header from '../Header/Header.tsx'



export default function Map({renderItineraryStations}) {
  const [stations, setStations] = useState<string[]>([])

  useEffect(() => {
    fetchData()
    .then(data => {
      const filteredStations = data['fuel_stations'].filter(station => station['access_code'] === 'public')
      setStations(filteredStations)
    })
  }, [stations])

  const grabStationIds = 
    stations.map(station => {
      return (
        <Station 
        id={station.id} 
        key={station.id}
        renderItineraryStations={renderItineraryStations}
        />
      )})
  
  return (
    <div className='station-map'>
      <Header />
      {grabStationIds}
    </div>
  )
}