import React, {useState, useEffect} from 'react';
import {
    Paper,
    Grid,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Alert
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../../Components/FormElements/Button';
import { generateId } from '../../Utilis/Utilis';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addUser, resetUser, getUser, updateUser } from '../../Redux/Slice/UserSlice';
import PageLoading from '../../Components/PageLoading/PageLoading';
import { TIMEOUT_TIME } from '../../Utilis/Utilis';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    userName: Yup.string().required('User name is required'),
    mobile: Yup.string().required('Mobile is required'),
    role: Yup.string().required('Please select role'),
    password: Yup.string().required('Password is required').min(8, 'Password is too short').max(15, 'Password is too long'),
});

const formInitialValues = {
    name: '',
    email: '',
    userName: '',
    mobile: '',
    role: '',
    password: ''
}

const UserForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showMessage, setShowMessage] = useState(null)

    const {message, userDetails, roleList} = useSelector((state)=>{
        return{
            userDetails: state?.user?.userDetails,
            message: state?.user?.message,
            roleList: state?.role?.roleList
        }
    })
    const [initialValues, setInitialValues] = useState(formInitialValues)

    useEffect(()=>{
        if(params?.id){
            setIsLoading(true)
            dispatch(getUser(params.id))
            setTimeout(()=>{
                setIsLoading(false)
            },TIMEOUT_TIME)
        }
    },[])

    const handeSave = ({name, email, userName, mobile, role, password}) => {
        setIsLoading(true)
        let id = params?.id;
        if(!id)
            id = generateId()
        const payload = {
            id,
            name,
            email,
            userName,
            mobile,
            role,
            password
        }
        if(params?.id){
            dispatch(updateUser(payload))
        }else{
            dispatch(addUser(payload))
        }
    }

    useEffect(()=>{
        if(message){
            setShowMessage(message)
            dispatch(resetUser())
            setTimeout(()=>{
                navigate(-1)
            },TIMEOUT_TIME)
        }
        if(userDetails && params?.id){
            setInitialValues({
                ...initialValues,
                ...userDetails,
                password: ''
            })
        }
    },[message, userDetails])

    const handleBack = () => {
        navigate('/users')
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
                    <Typography variant="h5"><strong>User</strong></Typography>
                    <Typography variant='body2'>Create/Update your user</Typography>
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
                                        value={values?.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={errors.name && touched.name && (errors.name)}
                                    /> 
                                </Grid>
                                <Grid item xs={6} sx={{marginBottom: 1}} textAlign='left'>
                                    <TextField
                                        error={errors.email && touched.email}
                                        id="email"
                                        label="Email"
                                        fullWidth
                                        value={values?.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={errors.email && touched.email && (errors.email)}
                                    /> 
                                </Grid>
                                <Grid item xs={6} sx={{marginBottom: 1}} textAlign='left'>
                                    <TextField
                                        error={errors.userName && touched.userName}
                                        id="userName"
                                        label="User Name"
                                        fullWidth
                                        value={values?.userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={errors.userName && touched.userName && (errors.userName)}
                                    /> 
                                </Grid>
                                <Grid item xs={6} sx={{marginBottom: 1}} textAlign='left'>
                                    <TextField
                                        error={errors.mobile && touched.mobile}
                                        id="mobile"
                                        label="Mobile"
                                        fullWidth
                                        value={values?.mobile}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={errors.mobile && touched.mobile && (errors.mobile)}
                                    /> 
                                </Grid>
                                <Grid item xs={6} sx={{marginBottom: 1}} textAlign='left'>
                                    <FormControl 
                                        sx={{ width: '100%' }} 
                                        error={errors.role && touched.role}
                                    >
                                        <InputLabel id="role">Role</InputLabel>
                                        <Select
                                            labelId="role"
                                            id="role"
                                            value={values.role}
                                            label="Role"
                                            onChange={(e)=>setFieldValue('role', e.target.value)}
                                            onBlur={(e)=>setFieldValue('role', e.target.value)}
                                        >
                                            {roleList?.map((role)=>{
                                                return(
                                                    <MenuItem key={role?.id} value={role?.id}>{role?.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>{errors.role && touched.role && (errors.role)}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sx={{marginBottom: 1}} textAlign='left'>
                                    <TextField
                                        error={errors.password && touched.password}
                                        id="password"
                                        label="Password"
                                        fullWidth
                                        type='password'
                                        // value={values?.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={errors.password && touched.password && (errors.password)}
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
export default UserForm;