import React from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

export default class TableOperation extends React.Component {
  render() {
    return (
      <Table responsive borderless hover>
        <thead>
          <tr>
            <th>Code Opération</th>
            <th>Libelle opération</th>
            <th>Temps unitaire</th>
            <th>Nature</th>
            <th>Metier</th>
            <th>Modifier/Supprimer</th>
            <th><i class="fa fa-pencil" aria-hidden="true"></i></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Nature</td>
            <td>Metier</td>
            &nbsp; &nbsp;&nbsp; &nbsp;
            <button
              type="button"
              className="btn btn-sm btn-primary m-2 ml-auto"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <button
              type="button"
              className="btn btn-sm btn-danger m-2 ml-auto"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </tr>
        </tbody>
      </Table>
    );
  }
}