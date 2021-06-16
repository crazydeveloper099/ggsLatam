import EventSection from "../../../components/EventSection/EventSection.js";
import { TOURNAMENTS } from "../../../Constants/Constants.js";
export default function Tournament() {
    return(
        <EventSection index={2} eventType={TOURNAMENTS}/>
    )
}