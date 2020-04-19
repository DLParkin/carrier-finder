import React, { Component, Fragment } from 'react';
import { carrierData } from '../_data/CarrierData';
import matchSorter from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button } from 'reactstrap';
import Modal from 'react-modal';
import DetailsCard from './DetailsCard';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '1rem'
  }
};

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: carrierData ? carrierData : 'Failed to load',
      modalIsOpen: false,
      rowInfo: [],
      latlng: []
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showDetails() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  setDetails(data) {
    this.setState({
      rowInfo: data
    });
    const location = `${data.original.B}, WA`;
    geocodeByAddress(data.original.B && location)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ latlng: latLng }))
      .catch(error => console.error('Error', error));
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
          columns={[
            {
              Header: 'Location',
              columns: [
                {
                  Header: 'Suburb',
                  id: 'B',
                  accessor: d => d.B,
                  filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['B'] }),
                  filterAll: true
                },
                {
                  Header: 'Post Code',
                  id: 'C',
                  accessor: d => d.C,
                  filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['C'] }),
                  filterAll: true
                }
              ]
            },
            {
              Header: 'Onforwarder',
              columns: [
                {
                  Header: 'Carrier',
                  id: 'A',
                  accessor: d => d.A,
                  filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['A'] }),
                  filterAll: true
                }
              ]
            }
          ]}
          defaultPageSize={15}
          className="-striped -highlight"
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                if (handleOriginal) {
                  handleOriginal();
                  this.setDetails(rowInfo);
                  this.showDetails();
                }
              }
            };
          }}
        />
        {this.state.modalIsOpen ? (
          <Fragment>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.state.closeModal}
              style={customStyles}
              contentLabel="Details Modal"
            >
              <DetailsCard info={this.state.rowInfo} latlng={this.state.latlng} />
              <Button onClick={this.closeModal} className="results-button" size="sm" block>
                Close
              </Button>
            </Modal>
          </Fragment>
        ) : (
          ''
        )}
      </Fragment>
    );
  }
}
