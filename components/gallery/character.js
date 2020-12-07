import React, { Fragment, useCallback } from "react";
import styles from "./gallery.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock }  from '@fortawesome/free-solid-svg-icons'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import router from "next/router";
import Link from 'next/link'

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#000',
    color: '#6fff9a',
    fontSize: 14,
    fontweight: 500,
  },
}))(Tooltip);

const Character = ({ data, id }) => {


    const ReviewLine = ({
      dataField,
      extraLines,
    }) => {
      return dataField ? (
        <Fragment>
          <div>
            <div className={styles.label}>{dataField}</div>        
            {extraLines &&
              extraLines.map((line, index) => {
                return line && <div key={index}>{line}</div>;
              })}

          </div>
        </Fragment>
      ) : (null)
      
    };
    const handleEdit = useCallback((row) => {
      router.push(`../directory/character/${row.id}`)
    })

    return (
      <div className={styles.frame}>
        <div className={styles.charimg}>
         <img src={data.location}/> 
         {data.location === "" &&
          <img src="/charholder.png"/> 
        }
        </div>
       {/*  make a different placeholder image */}
        
       <div className={styles.name}>
        <a href={`../${data.id}`}>
        <ReviewLine 
          dataField={data.characterName}
        /></a></div>

        <div className={styles.fandom}>
          <ReviewLine
            dataField={data.fandom}
          /></div>
          <div className={styles.private}>
            {data.visibility === "private" &&
            <HtmlTooltip title="Private" >
              <div>
          <FontAwesomeIcon icon={faLock} /></div></HtmlTooltip> 
        }
        </div>
      </div>
    );
  };


export default Character;


