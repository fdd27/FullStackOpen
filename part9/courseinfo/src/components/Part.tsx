import { CoursePart } from "../types";

interface PartProps {
    part: CoursePart;
}

const Part = (props: PartProps) => {
    let output;
    const mb = {
        marginBottom: '15px'
    }

    switch (props.part.kind) {
        case 'basic':
            output = <div style={mb}>
                <strong>{props.part.name} {props.part.exerciseCount}</strong><br />
                <em>{props.part.description}</em>
            </div>
            break;
        case 'background':
            output = <div style={mb}>
                <strong>{props.part.name} {props.part.exerciseCount}</strong><br />
                <em>{props.part.description}</em><br />
                submit to {props.part.backgroundMaterial}
            </div>
            break;
        case 'group':
            output = <div style={mb}>
                <strong>{props.part.name} {props.part.exerciseCount}</strong><br />
                project exercises {props.part.groupProjectCount}
            </div>
            break;
        case 'special':
            output = <div style={mb}>
                <strong>{props.part.name} {props.part.exerciseCount}</strong><br />
                <em>{props.part.description}</em><br />
                required skills: {props.part.requirements.join(', ')}
            </div>
            break;
        default:
            break;
    }

    return (
        <div>
            {output}
        </div>
    );
};

export default Part;