import React, { useEffect, useState } from 'react'
import '../Stylesheet/Admin.css';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function actionCellRenderer(params) {
        let eGui = document.createElement("div");
        eGui.innerHTML = '<button class="action-button delete" data-action="delete" > Delete </button>';
        return eGui;
}

function onCellClicked(params){
    if (params.column.colId === "action" && params.event.target.dataset.action) {
        ////axios.delete('http://localhost:5000/users/delete', params.data._id)
        const response =  axios({
            method: 'DELETE',
            url: 'http://localhost:5000/users/delete',
            data: {
            _id: params.data._id
            },
            
        })
            console.log(response);
    }
}

function UserList(props) {
    const [employees, setemployees] = useState(0);
    const [maxEmpId, setMaxEmployeeId] = useState(0);

    
    function addEmployee(){
        var user = {"EmployeeID": parseInt(maxEmpId) + 1};
        axios.post('http://localhost:5000/users/add', user)
            .then(response => console.log(response));
    }

    if(employees !== 0)
    for(var employee of employees)
    {
        if(employee.EmployeeID>maxEmpId)
        {
            setMaxEmployeeId(employee.EmployeeID);
        }
    }
    //And here you use closure!!
    async function getData(){
        const res = await axios.get('http://localhost:5000/users');
        setemployees(res.data);
    }

    var CellValueChanged = (event) => {
      axios.put('http://localhost:5000/users/update', event.data)
        .then(response => console.log(response));
    }

    useEffect(() => {
      getData();
    }, []);

    var columnDefs = [
        { headerName: "_id", field: "_id", editable:false, sortable: true, resizable: true, hide:true},
        { headerName: "EmployeeID", field: "EmployeeID", editable:false, sortable: true, resizable: true},
        { headerName: "FirstName", field: "FirstName", editable:true, sortable: true, resizable: true },
        { headerName: "LastName", field: "LastName", editable:true, sortable: true, resizable: true },
        { headerName: "Address", field: "Address", editable:true, sortable: true, resizable: true },
        { headerName: "RoleName", field: "UserRole.RoleName", sortable: true, resizable: true },
        { headerName: "Action", minWidth: 150, cellRenderer: actionCellRenderer, editable: false, colId: "action"}
    ];

    return (
        <div>
            <div
				className="ag-theme-balham"
				style={{
					height: '500px',
					width: '1200px',
                    cursor:'pointer'
				}}
			>
            <div className="AddEmployee" onClick={addEmployee}></div>
            <AgGridReact
                columnDefs={columnDefs}
                onCellValueChanged={CellValueChanged}
                onCellClicked = {onCellClicked}
                onCellMouseOver = {onmouseover}
                rowData={employees}>
            </AgGridReact>
            </div>
        </div>
    )
}

export default UserList;