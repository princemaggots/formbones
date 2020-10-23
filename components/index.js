import React, { Component } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit }  from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

/* STYLE THIS PAGE PLEASE */



createTheme('Swamp', {
    text: {
        primary: '#f2f2f2',
        secondary: '#fff',
     },
    background: {
        default: '#13251c',
    },
    context: {
        background: 'green',
        text: '#FFFFFF',
    },
    divider: {
        default: '#111114',
    },
    button: {
        default: '#2aa198',
        hover: 'rgba(0,0,0,.0)',
        focus: 'rgba(255,255,255,0)',
    },
    sortFocus: {
          default: '#2aa198',
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
      <div className="expander">
      <h3> Description</h3><p>
        {data.description}
        </p>
        <h3>Likes</h3><p>
        {data.likes}
        </p>
        <h3>Dislikes</h3>
        <p>
        {data.dislikes}
      </p>
      </div>
  );



class Index extends Component {
/*   handleAction(row) {
      return () => {
        console.log(row);
        if (this.props.onDelete) {
          this.props.onDelete(row);
        }
      }
  } */
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

export default Index

