import { Entry } from "../../types";

import WorkIcon from '@mui/icons-material/Work';

interface Props {
    entry: Entry;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
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

    if ('employerName' in entry) {
        return (
            <div key={entry.id} style={borderStyle}>
                <p>
                    {entry.date}
                    <WorkIcon style={iconStyle} />
                    <em>{entry.employerName}</em>
                </p>
                <p>
                    <em>{entry.description}</em>
                </p>
                <p>
                    diagnose by {entry.specialist}
                </p>
            </div>
        );
    }
    else return null;
};

export default OccupationalHealthcareEntry;