import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import { useRouter } from 'next/router'


export default function Profile () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const router = useRouter()


 

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/profile/getprofile')
      setContent(await res.json())
    }
    fetchData()
  },[session])





  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <Layout><AccessDenied/></Layout> }

  // If session exists, display content



  return (
    <Layout>
      <div className="containerhome">  
        {content}
    </div>
    </Layout>
  )
}