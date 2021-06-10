

export default function TabPanel(props) {

  return (
    <div
            style={{outline:'none',border:'none'}}
            role="tabpanel"
            hidden={props.value1 !== props.index}
            id={`full-width-tabpanel-${props.index}`}
            aria-labelledby={`full-width-tab-${props.index}`}
            >
            {props.value1 === props.index && (   
               <div style={{color:'white'}}>
               {props.children}
               </div>
            )}
        </div>
  );
}