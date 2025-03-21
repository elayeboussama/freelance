import React, { useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { PrivilegeTable } from '../components/projectAdminsTable'
import { TextField} from '@mui/material'
import { ManageDialog } from '../components/dialogue'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import axios from '../api/axios';


export const EditProject = () => {
  console.log("heyzzzz")
  
  const auth = useAuthContext(); 
  let {id , title : paramTitle, description : paramDescription, status : paramStatus} = useParams()
  console.log(id , paramTitle , paramDescription)
  const [title, setTitle] = React.useState(paramTitle )
  const [description, setDescription] = React.useState(paramDescription)
  const [status, setStatus] = React.useState(paramStatus)
  const [admins , setAdmins] = React.useState([{name :'farhat' , role : "admin" , id : "1"} , {name :'aziyaz' , role : "admin" , id : "2"}])
  const [memebers , setMembers] = React.useState([])
  const [update , setUpdate] = React.useState(false)
  const [viewers , setViewers] = React.useState([{name :'jilani' , role : "viewer" , id : "3"} , {name :'tijani' , role : "viewer" , id : "4"}])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(status==1){
      setStatus("open")

    }
    if(status==2){
      setStatus("closed")

    }
    if(status==0){
      setStatus("not verified yet")
    }


  },[status])
  const deleteProject = () => {
    
    axios.delete("http://127.0.0.1:8000/projects/project-delete/"+id+"/", 
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
  const handleSubmit = () => {
    axios.post("http://127.0.0.1:8000/projects/project-update/"+id+"/", {title:title,description:description},
    {
      headers: { 'Content-Type': 'application/json',
                  "Authorization": `Bearer ${auth?.user?.access}`,
        },
        


        

        }
      ).then((response) => {
        // TODO: remove console.logs before deployment
    

    setMembers(JSON.parse(response?.data))



    }).catch((err)=>{
      if (!err) {
        console.log('No Server Response');
      }  else {
        console.log(err)
        console.log('No data' )
      }
    }) ;
  }


   React.useEffect( ()=>{

      axios.get("http://127.0.0.1:8000/projects/project-members/list/"+id+"/", 
       {
         headers: { 'Content-Type': 'application/json',
                      "Authorization": `Bearer ${auth?.user?.access}`,
        },
        


        

       }
     ).then((response) => {
       // TODO: remove console.logs before deployment
     console.log("zzzzzz:",JSON.parse(response?.data));

    setMembers(JSON.parse(response?.data))

    
   
   }).catch((err)=>{
     if (!err) {
       console.log('No Server Response');
     }  else {
        console.log(err)
        console.log('No data' )
     }
   }) ;

 },[update])

  React.useEffect(() => {
   // fetchEmployees()
    // console.log("useEffect");
    // const employees = axios.get(endpointsURL.customerCompanyNames).then(response => { setAdmins(response.data) });
    // const customersNames = axios.get(endpointsURL.supplierCompanyNames).then(response => response.data );
    // Promise.all([supliersNames, customersNames]).then((values) =>  setCompanyNames([...values[0].concat(values[1])]))
  }, [ open])

  return (
    <Grid container padding={5}  
    direction="row"
    justifyContent="space-between"
    alignItems="center">
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <div>EDIT PROJECT</div>
      <Button variant="contained" color="error"  onClick={deleteProject}> delete project</Button>
          <TextField
              value={title}
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          <TextField
              value={description}
              margin="normal"
              required
              fullWidth
              id="description"
              label="description"
              name="description"
              autoComplete="description"
              onChange={(e) => setDescription(e.target.value)}
              multiline
            />
            <TextField
              value= {status}
              margin="normal"
              required
              fullWidth
              id="status"
              label="status"
              name="status"
              autoComplete="status"
              
              multiline
              disabled
            />
            
      <Button variant="contained" color="success" onClick={() => {
        handleClickOpen()
      }}>add member</Button >
      <br />
      <div>PROJECT MEMBERS</div>
      <br />
      <PrivilegeTable data={[...memebers]} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >update project</Button>
          </Box>
      <ManageDialog open={open} handleClose={handleClose} setUpdate={setUpdate} handleClickOpen={handleClickOpen} id={id}  />
    </Grid>
  )
}
