import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { registerState } from './atoms';
import Header from "./components/header";
import { useNavigate } from "react-router-dom";

export default function JobPage() {  
    // ** useState and resetState
    const [records, setRecords] = useRecoilState(registerState);
    const resetRegisterState = useResetRecoilState(registerState);

    // ** useNavigation
    const navigate = useNavigate();

    // ** handle form completion
    const handleDone = () => {
        localStorage.removeItem('user');
        resetRegisterState();
        navigate("/");
    }

    return (
        <div>
            <Header />
            <Container className='p-3 mt-5'>
                <Row >
                    <Col sm={8} className="mx-auto">
                        <h1>User Information</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Job History</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{records.firstName}</td>
                                    <td>{records.lastName}</td>
                                    <td>{records.email}</td>
                                    <td>{records.jobHistory}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button className="mt-2" variant="warning" type="button" onClick={() => handleDone()}>
                            Done
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
