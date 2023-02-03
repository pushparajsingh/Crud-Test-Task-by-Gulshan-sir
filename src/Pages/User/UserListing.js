import React, {useState, useEffect} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Typography,
    Button,
    Alert,
    IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableNoRecordFound from '../../Components/Table/TableNoRecordFound';
import { deleteUser, resetUser } from '../../Redux/Slice/UserSlice';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../Components/Modal/ConfirmationModal';
import { TIMEOUT_TIME } from '../../Utilis/Utilis';

const UserListing = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [showMessage, setShowMessage] = useState(null)
    const {message, userList, roleList} = useSelector((state)=>{
        return{
            userList: state.user.userList,
            message: state?.user?.message,
            roleList: state.role.roleList,
        }
    })

    const handleDelete = () => {
        dispatch(deleteUser(openModal))
    }

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },TIMEOUT_TIME)
    },[])

    useEffect(()=>{
        if(message){
            dispatch(resetUser())
            setOpenModal(null)
            setShowMessage(message)
            setTimeout(()=>{
                setShowMessage(null)
            },TIMEOUT_TIME)
        }
    },[message])

    return(
        <>
            {showMessage && (
                <Alert severity="success" variant="filled">{showMessage}</Alert>
            )}
            <Grid container spacing={2} sx={{marginBottom: 3}}>
                <Grid item xs={6} textAlign='left'>
                    <Typography variant="h5"><strong>Users</strong></Typography>
                    <Typography variant='body2'>Manage your user(s)</Typography>
                </Grid>
                <Grid item xs={6} textAlign='right'>
                    <Button 
                        variant='contained'
                        onClick={()=>navigate('/user/form')}
                    >
                        Add User
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SN</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !isLoading && userList?.map((user, index)=>{
                                return(
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index+1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.email}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.userName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.mobile}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {roleList?.find((role)=>role.id===user.role)?.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <IconButton 
                                                color="primary" 
                                                aria-label="Edit" 
                                                component="label"
                                                onClick={()=>navigate(`/user/form/${user.id}`)}
                                            >
                                                <ModeEditOutlineIcon />
                                            </IconButton>
                                            <IconButton 
                                                color="error" 
                                                aria-label="Delete" 
                                                component="label"
                                                onClick={()=>setOpenModal(index.toString())}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {(!userList?.length || isLoading) && (
                            <TableNoRecordFound colSpan='7' loading={isLoading}/>
                        )}
                    </TableBody>
                </Table>
                <ConfirmationModal
                    openModal={openModal}
                    closeModal={(val)=> val ? handleDelete() : setOpenModal(false) }
                />
            </TableContainer>
        </>
    )
}
export default UserListing;