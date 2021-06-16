import EventSection from "../../../components/EventSection/EventSection.js";
import { STATIC_CHALLENGE } from "../../../Constants/Constants.js";
export default function StaticEvent() {
    return(
        <EventSection index={1} eventType={STATIC_CHALLENGE}/>
    )
}