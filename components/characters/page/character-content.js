import React, { Fragment, useCallback } from "react";
import styles from "./character.module.css";
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock }  from '@fortawesome/free-solid-svg-icons'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import router from "next/router";
import parse from 'html-react-parser';


const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#000',
    color: '#6fff9a',
    fontSize: 14,
    fontweight: 500,
  },
}))(Tooltip);

const dataViewFilter = function(data) {
  data = data.replace(/(\r\n|\n|\r)/g, "<br/>");
  return parse(data)
}

const CharacterContent = ({ data }) => {


    return (
      <div className="containerhome">
      <div className={styles.flexbox}>

        <div className={styles.box1}>
            <div className={styles.charimg}>
            {data.location !== "" &&
            <img src={data.location}/> 
            }
                {data.location === "" &&
                <img src="/charholder.png"/> 
                }
            </div>
            <h1 className={styles.name}>{data.characterName}</h1>
            {/*  make a different placeholder image */}
            <div>{data.description}</div>
        </div>

        <div className={styles.box2}>
        <div className={styles.created}> 
            <Link href={`/profile/profile/${data.user_email}`}><button className={styles.creator}> created by: {data.user_email}</button></Link> 
            {data.visibility === "private" &&
                <HtmlTooltip title="Private" ><div className={styles.lock}>
                    <FontAwesomeIcon icon={faLock} />
                </div></HtmlTooltip> }</div>

            <div className={styles.textbox}>
                <h3> biography</h3>
                {dataViewFilter(data.biography)}
            </div>
            <div className={styles.textbox}>
              <h3>Additional Info</h3>
              <ul>
                <li><b>likes:</b> {data.likes}
                </li>
                <li><b>dislikes:</b> {data.dislikes}
                </li>
                <li><b>birthday:</b> {data.DOB}
                </li>
                <li><b>mbti:</b> {data.mbti}
                </li>
                <li><b>ennegram:</b> {data.ennegram}
                </li>
                <li><b>moral alignment:</b> {data.moralAlignment}
                </li>
              </ul>
            </div>  
        </div>

     </div>
     </div>
    );
  };


export default CharacterContent;


