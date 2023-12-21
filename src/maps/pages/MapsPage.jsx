import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { NavBar } from '../components/Navbar'
import { GeneralMap, MapView } from '../views'
import { JournalLayout } from '../layout/MapLayout'
import { useSelector } from 'react-redux'


export const MapsPage = () => {

  const { active } = useSelector(state => state.map)

  return (

    <JournalLayout>

      {
        (!!active) 
        ? <MapView /> 
        : <GeneralMap />
      }
        
    </JournalLayout>

     
  )
}
