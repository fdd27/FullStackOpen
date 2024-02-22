import { Entry } from "../../types";

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    entry: Entry;
}

const HealthCheckEntry = ({ entry }: Props) => {
    const borderStyle = {
        border: '1px solid black',
        borderRadius: '5px',
        padding: '0px 10px',
        marginBottom: '10px'
    };
    
    const iconStyle = {
        marginRight: '10px',
        marginLeft: '10px'
    };

    return (
        <div key={entry.id} style={borderStyle}>
            <p>
                {entry.date}
                <MedicalServicesIcon style={iconStyle} />
            </p>
            <p>
                <em>{entry.description}</em>
            </p>
            <FavoriteIcon style={{ color: '#ffec33' }} />
            <p>
                diagnose by {entry.specialist}
            </p>
        </div>
    );
};

export default HealthCheckEntry;