import { Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
    patient: Patient
}

const PatientPage = ({ patient }: Props) => {
    if (!patient) return <p>No patient</p>;
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h3>{patient.name}</h3>
                {patient.gender === 'male' && <MaleIcon style={{ margin: '18.72px 10px 18.72px 10px'}} />}
                {patient.gender === 'female' && <FemaleIcon style={{ margin: '18.72px 10px 18.72px 10px'}} />}
                {patient.gender === 'other' && <TransgenderIcon style={{ margin: '18.72px 10px 18.72px 10px'}} />}
            </div>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
        </div>
    );
};

export default PatientPage;