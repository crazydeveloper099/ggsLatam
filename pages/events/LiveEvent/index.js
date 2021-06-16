import EventSection from "../../../components/EventSection/EventSection.js";
import { LIVE_EVENT } from "../../../Constants/Constants.js";
export default function LiveEvent() {
    return(
        <EventSection index={0} eventType={LIVE_EVENT} />
    )
}