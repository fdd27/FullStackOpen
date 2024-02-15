import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
    return (
        <div>
            {props.courseParts.map(part => <Part part={part}/>)}
        </div>
    );
};

export default Content;