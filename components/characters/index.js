import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import IndexTable from './index-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import styles from './index-table.module.css'

  const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
      // You should target [class*="MuiButton-root"] instead if you nest themes.
      '.MuiPaginationItem-root':{
        color: 'white',
      },
      '.MuiPagination-ul':{
        marginTop: 12,
        marginBottom: 10,
      },
      '.MuiOutlinedInput-root':{
        borderRadius: 10,
        border: [
          [1, 'solid', '#2b9015']
        ],
    },
    '.MuiInputBase-root':{
      color: 'white',
      width: '30vw',
    },
    },
  })(() => null);
export default function Index () {
  const [selectedRows, setSelectedRows] =useState([])
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [toggleCleared, setToggleCleared] = React.useState(true);
  const router = useRouter()
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);





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

  const onQuery = useCallback(
    (event) => {
      if (event) {
        const fetchData = async () => {
          const res = await fetch(
            `/api/directory/getcharacters?queryString=${encodeURIComponent(
              event.currentTarget.value
            )}`
          );
          const results  = await res.json();
          setContent(results);
          console.log(results);
        };
        fetchData();
      }
    },
    [setContent]
  );



  const contextActions = useMemo(() => {
    return <FontAwesomeIcon icon={faTrash}  onClick={handleDelete} /> 
  })

  const Searchbar = useMemo(() => {
    return   <> <button className={styles.butones}>new character</button> <GlobalCss /> <TextField  name="queryString" onChange={onQuery} variant="outlined" /> </>
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
        <div className="mobiledisplay"> Please rotate screen to landscape to view characters.</div>

        {content && <IndexTable characters={content}  handleRowSelected={handleRowSelected} onDelete={handleDelete} contextActions={contextActions} onEdit={handleEdit}    paginationResetDefaultPage={resetPaginationToggle}  actions={Searchbar}  clearSelectedRows={toggleCleared}/>}
      </div>

    </Layout>
  )
}