import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import { useRouter } from 'next/router'
import styles from './gallery.module.css'
import Character from './character.js'
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles'
import { TextField } from "@material-ui/core";

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
        [1, 'solid', 'blue']
      ],
  },
  '.MuiInputBase-root':{
    color: 'white',
  },
  },
})(() => null);

export default function Gallery () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [numberOfPages, setNumberOfPages] = useState();
  const router = useRouter();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/directory/gallery/getcharacters");
      const { results, number_of_pages } = await res.json();
      setContent(results);
      setNumberOfPages(number_of_pages);
      console.log({ results, number_of_pages });
    };
    fetchData();
  }, [session]);
  const onPaginationChange = useCallback((event, page) => {
    console.log("change to page", page);
    const fetchData = async () => {
      const res = await fetch(
        `/api/directory/gallery/getcharacters?page=${page}`
      );
      const { results, number_of_pages } = await res.json();
      setContent(results);
      setNumberOfPages(number_of_pages);
    };
    fetchData();
  }, []);

  const onQuery = useCallback(
    (event) => {
      if (event) {
        const fetchData = async () => {
          const res = await fetch(
            `/api/directory/gallery/getcharacters?queryString=${encodeURIComponent(
              event.currentTarget.value
            )}`
          );
          const { results, number_of_pages } = await res.json();
          setContent(results);
          setNumberOfPages(number_of_pages);
          console.log({ results, number_of_pages });
        };
        fetchData();
      }
    },
    [setContent, setNumberOfPages]
  );



  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message



  // If session exists, display content
  if (!content) return null;
  return (
    <Layout>
      <div className="containerhome">
        <div className={styles.top}>
        {session &&   <Link href="/directory/allcharacters"><button className={styles.directory}> Character Directory</button></Link>} 
        <GlobalCss />
        <TextField className={styles.search} name="queryString" onChange={onQuery} variant="outlined" />




      </div>
      <div className={styles.chardisplay}>
      {content.map((item) => (
         <Character
            data={item}
          />
        )) }
      </div> 

      {numberOfPages === 0 && <div className={styles.none}> Nope!</div>}

      {numberOfPages !== 0 && 
      <>
         
      <Pagination 
      onChange={onPaginationChange} 
      count={numberOfPages} 
      /> 
      </>}
        </div>
    </Layout>
  );
 };