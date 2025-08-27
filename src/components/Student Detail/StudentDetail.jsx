import { Typography } from '@mui/material';
import Card from '@mui/material/Card';

const StudentDetail = (props) => {
    return (
        <>
            <Card>
                <Typography variant='h5' gutterBottom>
                    Name: {props.name}
                </Typography>
                <Typography variant='h5' gutterBottom>
                    Email: {props.email}
                </Typography>
                <Typography variant='h5' gutterBottom>
                    Phone Number: {props.phoneNo}
                </Typography>
                <Typography variant='h5' gutterBottom>
                    Role: {props.role}
                </Typography>
                <Typography variant='h5' gutterBottom>
                    CreatedAt: {props.createdAt}
                </Typography>
            </Card>
        </>
    )
}

export default StudentDetail
