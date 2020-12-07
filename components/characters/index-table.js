import React, { Component } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit }  from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from './index-table.module.css'

/* STYLE THIS PAGE PLEASE */



createTheme('Swamp', {
    text: {
        primary: '#f2f2f2',
        secondary: '#fff',
     },
    background: {
        default: '#204628',
    },
    context: {
        background: '#3b9155',
        text: '#FFFFFF',
    },
    divider: {
        default: '#181821',
    },
    button: {
        default: '#3cd7ca',
        hover: 'rgba(0,0,0,.0)',
        focus: 'rgba(255,255,255,0)',
        disabled: 'rgba(0, 0, 0, .50)',
    },
    sortFocus: {
          default: '#71dad2',
        },

    highlightOnHover: {
        default: '#458765',
        text: '#fff',
    }
});

const customStyles = {
    rows: {
        style: {
            fontSize: '14px',
        },
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: '600',
        paddingLeft: '2px', // override the cell padding for head cells
        paddingRight: '2px',
      },
    },
    cells: {
      style: {
        paddingLeft: '2px', // override the cell padding for data cells
        paddingRight: '2px',
      },
    },
  };

const ExpandedList = ({ data }) => (
      <div className={styles.expander}>
        <div className={styles.text}>
          <div className={`${styles.textbox} ${styles.t1}`}>
            <h3> Description</h3><p>
              {data.description}
              </p>
            </div>
            <div className={styles.textbox}>
            <h3> Biography</h3><p>
                {data.biography}
              </p>
            </div>
        </div>
        <div className={styles.chardisplay}>
          <img src={data.location} />
          {data.location === "" &&
          <img src="/charholder.png"/> 
        }
          <div className={`${styles.textbox} ${styles.margin}`}>
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
            <div className={styles.route}>
              <Link href={`./${data.id}`}>
              <button className={styles.route} > view as full page</button></Link>
            </div>
        </div>
      </div>
  );



class IndexTable extends Component {
  handleEdit(row) {
    return () => {
      if (this.props.onEdit) {
        this.props.onEdit(row);
      }
    }
  }


  render () {

    const {contextActions} = this.props 
    const {handleRowSelected} = this.props
    const {clearSelectedRows} = this.props

    const columns = [
      {
        name: 'Name',
        selector: 'characterName',
        sortable: true,
      },
      {
        name: 'Fandom',
        selector: 'fandom',
        sortable: true,
      },
      {
        name: 'DOB',
        selector: 'DOB',
        sortable: true,
      },
      {
        name: 'MBTI',
        selector: 'mbti',
        sortable: true,
      },
      {
        name: 'Ennegram',
        selector: 'ennegram',
        sortable: true,
      },
      {
        name: 'Moral Alignment',
        selector: 'moralAlignment',
        sortable: true,
      },
      {
        name: '',
        selector: 'edit',
        sortable: false,
        button: true,
        width: '50px',
        pointerOnHover: true,
        cell: row => <FontAwesomeIcon icon={faEdit} onClick={this.handleEdit(row)} />
      },
    ];




    //console.log(React.version)
/*     this.props.characters.map(o => (o.edit = <Link href={`/directory/character/${o.id}`}><FontAwesomeIcon icon={faEdit} /></Link>)); 
   this.props.characters.map(o => (o.delete = <Link href={`directory/deletecharacter/${o.id}`}><FontAwesomeIcon icon={faTrash} /></Link>))   */



    return (
      <DataTable
        theme="Swamp"
        data={this.props.characters}
        columns={columns}
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={clearSelectedRows}
        selectableRows
        selectableRowsVisibleOnly
        expandableRows
        highlightOnHover
        defaultSortField="name"
        expandableRowsComponent={<ExpandedList />}
        customStyles={customStyles}
        pagination
      />
    )
  };
};

export default IndexTable

