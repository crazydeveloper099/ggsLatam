import EventSection from "../../../components/EventSection/EventSection.js";
import { SPECIAL_EVENT } from "../../../Constants/Constants.js";
export default function SpecialEvent() {
    return(
        <EventSection index={4} eventType={SPECIAL_EVENT}/>
    )
}