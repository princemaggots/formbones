import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import { useRouter } from 'next/router'
import styles from './gallery.module.css'
import Character from './character.js'


export default function Gallery () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const router = useRouter()


 

   // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/directory/gallery/getcharacters')
      setContent(await res.json())
    }
    fetchData()
  },[session]) 

  



  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <Layout><AccessDenied/></Layout> }

  // If session exists, display content


  // If session exists, display content
  if (!content) return null;
  return (
    <Layout>
      <div className="containerhome character-grid">
      <div className={styles.chardisplay}>
      {content.map((item) => (
          <Character
            data={item}
          />
        ))}
      </div>
        </div>
    </Layout>
  );
 };