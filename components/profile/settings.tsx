import SettingsForm from '../profile/settingsForm' 
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../layout'
import AccessDenied from '../access-denied'

export default function Settings() {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
    }
    fetchData()
  },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }





  const initialValues={
    name: '', 
    about: '',
   /*  location: '', */
  }

  // If session exists, display content
  return (
    <div className="page">
    <Layout>
      <div className="App">      
        <SettingsForm initialValues={initialValues}/> 
      </div>
    </Layout>
    </div>
  )
}
