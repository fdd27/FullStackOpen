import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthcheckEntry";

import { Entry } from "../../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const assertNever = (x: never): never => {
        throw new Error(`Type of entry ${x} doesn't exist`);
    };

    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;