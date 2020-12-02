
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../layout'
import AccessDenied from '../../access-denied'
import {useRouter} from 'next/router'
import CharacterContent from './character-content'

export default function CharacterPage () {
  const [ session, loading ] = useSession()
  const [ character , setCharacter ] = useState()
  const router = useRouter()

  const character_id = router.query.id;

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      if (typeof character_id !== 'undefined') {
        const res = await fetch(`/api/directory/charpage/${character_id}`)
        setCharacter(await res.json()) 
      }
    }
    fetchData()
  },[session, router.query])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!character) return null;


  // If session exists, display content
  return (
    <div className="page">
    <Layout>
     <CharacterContent
      data={character}
      /> 
    </Layout>
    </div>
  )
}