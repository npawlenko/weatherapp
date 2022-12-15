import {AnimatePresence, motion} from "framer-motion";
import useAlert from "../../hooks/useAlert";
import "./AlertPopup.scss";

function AlertPopup() {
    const {text, type} = useAlert();


    return (
            <div className="alert-popup">
                <AnimatePresence>
                    {(text && type) && (
                    <motion.div className={"alert alert-" + type} role="alert"
                                initial={{x: -1000}}
                                animate={{x: 0}}
                                exit={{x: -1000}}>
                        {text}
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
    )

}

export default AlertPopup;