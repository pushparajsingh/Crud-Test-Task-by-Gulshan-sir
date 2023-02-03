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
    IconButton,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TableNoRecordFound from '../../Components/Table/TableNoRecordFound';
import Button from '../../Components/FormElements/Button';
import ConfirmationModal from '../../Components/Modal/ConfirmationModal';
import { deleteRole, resetRole } from '../../Redux/Slice/RoleSlice';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { TIMEOUT_TIME } from '../../Utilis/Utilis';

const RoleListing = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [showMessage, setShowMessage] = useState(null)
    const {message, roleList} = useSelector((state)=>{
        return{
            roleList: state.role.roleList,
            message: state?.role?.message
        }
    })

    const handleDelete = () => {
        dispatch(deleteRole(openModal))
    }

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },TIMEOUT_TIME)
    },[])

    useEffect(()=>{
        if(message){
            dispatch(resetRole())
            setOpenModal(null)
            setShowMessage(message)
            setTimeout(()=>{
                setShowMessage(null)
            },2000)
        }
    },[message])

    return(
        <>
            {showMessage && (
                <Alert severity="success" variant="filled">{showMessage}</Alert>
            )}
            <Grid container spacing={2} sx={{marginBottom: 3}}>
                <Grid item xs={6} textAlign='left'>
                    <Typography variant="h5"><strong>Roles</strong></Typography>
                    <Typography variant='body2'>Manage your role(s)</Typography>
                </Grid>
                <Grid item xs={6} textAlign='right'>
                    <Button 
                        variant='contained'
                        onClick={()=>navigate('/role/form')}
                        label='Add Role'
                    />
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SN</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !isLoading && roleList?.map((role, index)=>{
                                return(
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index+1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {role.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <IconButton 
                                                color="primary" 
                                                aria-label="Edit" 
                                                component="label"
                                                onClick={()=>navigate(`/role/form/${role.id}`)}
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
                        {(!roleList?.length || isLoading) && (
                            <TableNoRecordFound colSpan='3' loading={isLoading}/>
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
export default RoleListing;