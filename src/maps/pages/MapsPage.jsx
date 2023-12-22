import React from 'react'
import { JournalLayout } from '../layout/MapLayout'
import { useSelector } from 'react-redux'
import { MedellinMap } from '../views/MedellinMap'
import { Profile } from '../views/Profile'
import { GeneralMap } from '../views/GeneralMap'


export const MapsPage = () => {

  const { generalMapActive, medellinMapActive, profileActive } = useSelector(state => state.map)

  return (

    <JournalLayout>

      {generalMapActive && <GeneralMap />}
      {medellinMapActive && <MedellinMap />}
      {profileActive && <Profile />}

    </JournalLayout>

     
  )
}
