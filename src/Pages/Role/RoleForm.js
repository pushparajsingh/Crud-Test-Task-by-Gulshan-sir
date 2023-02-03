import React, {useState, useEffect} from 'react';
import {
    Paper,
    Grid,
    Typography,
    TextField,
    Alert
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { generateId, TIMEOUT_TIME } from '../../Utilis/Utilis';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addRole, resetRole, getRole, updateRole } from '../../Redux/Slice/RoleSlice';
import Button from '../../Components/FormElements/Button';
import PageLoading from '../../Components/PageLoading/PageLoading';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
});

const formInitialValues = {
    name: ''
}

const RoleForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(null)

    const {message, roleDetails} = useSelector((state)=>{
        return{
            roleDetails: state?.role?.roleDetails,
            message: state?.role?.message
        }
    })
    const [initialValues, setInitialValues] = useState(formInitialValues)

    useEffect(()=>{
        if(params?.id){
            setIsLoading(true)
            dispatch(getRole(params.id))
            setTimeout(()=>{
                setIsLoading(false)
            },TIMEOUT_TIME)
        }
    },[])

    const handeSave = ({name}) => {
        setIsLoading(true)
        let id = params?.id;
        if(!id)
            id = generateId()
        const payload = {
            id,
            name
        }
        if(params?.id){
            dispatch(updateRole(payload))
        }else{
            dispatch(addRole(payload))
        }
    }

    useEffect(()=>{
        if(message){
            setShowMessage(message)
            dispatch(resetRole())
            setTimeout(()=>{
                navigate(-1)
            },2000)
        }
        if(roleDetails){
            setInitialValues({
                ...initialValues,
                name: roleDetails?.name
            })
        }
    },[message, roleDetails])

    const handleBack = () => {
        navigate('/roles')
    }

    return(
        <>
            {showMessage && (
                <Alert severity="success" variant="filled">{showMessage}</Alert>
            )}
            <PageLoading
                loading={isLoading}
            />
            <Grid container spacing={2} sx={{marginBottom: 3}}>
                <Grid item xs={6} textAlign='left'>
                    <Typography variant="h5"><strong>Role</strong></Typography>
                    <Typography variant='body2'>Create/Update your role</Typography>
                </Grid>
            </Grid>
            <Paper 
                sx={{padding: 4}}
            >
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handeSave}
                    >
                        {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sx={{marginBottom: 1}} textAlign='left'>
                                    <TextField
                                        error={errors.name && touched.name}
                                        id="name"
                                        label="Name"
                                        fullWidth
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.name}
                                        helperText={errors.name && touched.name && (errors.name)}
                                    /> 
                                </Grid>
                                <Grid item xs={12} sx={{marginBottom: 1}} textAlign='right'>
                                    <Button 
                                        variant='outlined'
                                        type='button'
                                        sx={{marginRight: 1}}
                                        label='Cancel'
                                        loading={isLoading}
                                        onClick={handleBack}
                                    />
                                    <Button 
                                        variant='contained'
                                        type='submit'
                                        label='Save'
                                        loading={isLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                        )}
                </Formik>
            </Paper>
        </>
    )
}
export default RoleForm;