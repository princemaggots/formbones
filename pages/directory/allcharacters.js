import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import Index from '../../components/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useRouter } from 'next/router'


export default function Page () {
  const [selectedRows, setSelectedRows] =useState([])
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const router = useRouter()


  const handleRowSelected = useCallback((event) => {
    console.log(event)
    setSelectedRows(event.selectedRows)
  }, [setSelectedRows])

  const handleDelete = useCallback(() => {
    console.log('delete rows', selectedRows);
    if (confirm('Delete character?')) {
      // Delete it
      const ids = selectedRows.map(a => a.id);
       axios.post(
        '/api/directory/deletecharacters',
        ids
      ).then(async () => {
        const res = await fetch('/api/directory/getcharacters')
        setContent(await res.json())
      });
      console.log('Character was deleted.');
      setToggleCleared(!toggleCleared);
    } else {
      // Do nothing!
      console.log('Character was not deleted.');
    }
  }, [selectedRows])

  const handleEdit = useCallback((row) => {
    router.push(`/directory/character/${row.id}`)
  })

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

        {content && <Index characters={content}  handleRowSelected={handleRowSelected} onDelete={handleDelete} contextActions={contextActions} onEdit={handleEdit}       clearSelectedRows={toggleCleared}/>}
      </div>

    </Layout>
  )
}