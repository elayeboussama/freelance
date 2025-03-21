import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import axios from '../api/axios';
import { useAuthContext } from '../hooks/useAuthContext';
  

export const  PrivilegeTable =({data })=> {



  
  const auth = useAuthContext();

  
    const deleteUser = async (id) => {
      await axios.delete("http://127.0.0.1:8000/projects/project-members-delete/"+id+"/", 
      {
        headers: { 'Content-Type': 'application/json',
                      "Authorization": `Bearer ${auth?.user?.access}`,
        },
        


        

      }
    ).then((response) => {
      // TODO: remove console.logs before deployment
      

    

  }).catch((err)=>{
    if (!err) {
      console.log('No Server Response');
    }  else {
        console.log(err)
        console.log('No data' )
    }
  }) ;

    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">name</TableCell>
            <TableCell align="left">permission</TableCell>
            <TableCell align="left">delete member</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row[1]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {row[1]}
              </TableCell>
              <TableCell align="left">{row[2] }</TableCell>
              <TableCell align="left" ><Button color="error" variant="contained" onClick={()=>deleteUser(row[0])}>delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}