import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import Index from '../../components/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


export default function Page () {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()

  const handleRowSelected = useCallback((event) => {
    console.log(event)
  })

  const handleDelete = useCallback((row) => {

    if (confirm('Delete character?')) {
      console.log(selectedRows);
      // Delete it
      axios.post(
        '/api/directory/deletecharacters',
        selectedRows
      ).then(async () => {
        const res = await fetch('/api/directory/getcharacters')
        setContent(await res.json())
      });
      console.log('Character was deleted.');
    } else {
      // Do nothing!
      console.log('Character was not deleted.');
    }
  }, [setContent])

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/directory/getcharacters')
      setContent(await res.json())
    }
    fetchData()
  },[session])



  const contextActions = useMemo(() => {
    return <FontAwesomeIcon icon={faTrash}  onClick={handleDelete} />
  })



  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <Layout><AccessDenied/></Layout> }

  // If session exists, display content



  return (
    <Layout>
      <div className="containerhome">  
        <h1 className="right">Characters</h1>
        <p className="right"> All the characters you have submitted.</p>

        {content && <Index characters={content}  handleRowSelected={handleRowSelected} onDelete={handleDelete} contextActions={contextActions} />}
      </div>

    </Layout>
  )
}