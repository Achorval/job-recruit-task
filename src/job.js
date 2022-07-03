import * as Yup from "yup";
import { useState } from "react";
import classnames from 'classnames'
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Container, Row, Col } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { registerState } from './atoms';
import Header from "./components/header";

export default function JobPage() {  
    // ** useState and useRecoilState
    const [currentStep, setCurrentStep] = useState(0);
    const [setRecords] = useRecoilState(registerState);
    
    // ** useNavigation
    const navigate = useNavigate();

    // ** Get registered use on page refresh
    const user = JSON.parse(localStorage.getItem('user')); 

    // ** Initial values
    const [data, setData] = useState({
        firstName: user && user.firstName ? user.firstName : '',
        lastName: user && user.lastName ? user.lastName : '',
        email: user && user.email ? user.email : '',
        jobHistory: user && user.jobHistory ? user.jobHistory : '',
    });

    // ** Make request ands submit form
    const MakeRequest = (formData) => {
        localStorage.setItem('user', JSON.stringify(formData));
        setRecords(formData);
        navigate("/history");
    };

    // ** handle next step
    const handleNextStep = (newData, final = false) => {
        setData(prev => ({...prev, ...newData}));

        if (final) {
            MakeRequest(newData);
            return true;
        };

        setCurrentStep(prev => prev + 1); 
    };

    // ** Handle prev step
    const handlePrevStep = (newData) => {
        setData(prev => ({...prev, ...newData}));
        setCurrentStep(prev => prev - 1); 
    };

    // ** Steps
    const steps = [
        <StepOne next={handleNextStep} data={data} />, 
        <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />
    ];
    
    return (
        <div>
            <Header />
            <Container className='p-3'>
                <Row >
                    <Col sm={6} className="mx-auto">
                        <h1 className="mb-3">User Registration</h1>
                        {steps[currentStep]}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// ** Handle step one
const StepOne = (props) => {
    const handleSubmit = (values) => {
        props.next(values);
    };

    const stepOneValidationSchema = Yup.object({
        firstName: Yup.string().required('Please Enter First Name'),
        lastName: Yup.string().required('Please Enter Last Name'),
        email: Yup.string().email('Invalid email').required('Please Enter Email')
    });

    return (
        <Formik
            validationSchema={stepOneValidationSchema}
            initialValues={props.data}
            onSubmit={handleSubmit}
        >
            {({values, errors, touched, handleChange, handleBlur}) => (
                <> 
                <h4 className="text-primary">Phase 1</h4>
                <Form>
                    <div className="form-group mb-3">
                        <label className="mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className={classnames('form-control', { 'is-invalid': errors.firstName && touched.firstName && true })}
                            onChange={handleChange}
                            value={values.firstName}
                            onBlur={handleBlur}
                            placeholder="First Name"
                        />
                        {errors.firstName && touched.firstName && <span className="error-msg">{errors.firstName}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className={classnames('form-control', { 'is-invalid': errors.lastName && touched.lastName && true })}
                            onChange={handleChange}
                            value={values.lastName}
                            onBlur={handleBlur}
                            placeholder="Last Name"
                        />
                        {errors.lastName && touched.lastName && <span className="error-msg">{errors.lastName}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className={classnames('form-control', { 'is-invalid': errors.email && touched.email && true })}
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}
                            placeholder="Email"
                        />
                        {errors.email && touched.email && <span className="error-msg">{errors.email}</span>}
                    </div>
                    <button className="btn btn-primary" type="submit">Continue</button> 
                </Form>
                </>
            )}
        </Formik>
    )
};

// ** handle step two
const StepTwo = (props) => {
    const handleSubmit = (values) => {
        props.next(values, true);
    };

    const stepTwoValidationSchema = Yup.object({
        jobHistory: Yup.string().required('Please Enter Job History')
    });

    return (
        <Formik
            validationSchema={stepTwoValidationSchema}
            initialValues={props.data}
            onSubmit={handleSubmit}
        >
            {({values, errors, touched, handleChange, handleBlur}) => (
                <>
                <h4 className="text-primary">Phase 2</h4>
                <Form>
                    <div className="form-group mb-3">
                        <label className="mb-1">Job History</label>
                        <input
                            type="text"
                            name="jobHistory"
                            className={classnames('form-control', { 'is-invalid': errors.jobHistory && touched.jobHistory && true })}
                            onChange={handleChange}
                            value={values.jobHistory}
                            onBlur={handleBlur}
                            placeholder="Job History"
                        />
                        {errors.jobHistory && touched.jobHistory && <span className="error-msg">{errors.jobHistory}</span>}
                    </div>
                    <button className="btn btn-outline-primary me-2" type="button" onClick={() => props.prev(values)}>Back</button>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </Form>
                </>
            )}
        </Formik>
    )
};
