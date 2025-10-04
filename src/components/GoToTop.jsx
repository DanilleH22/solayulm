import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GoToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        // Multiple methods to ensure scrolling
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Force scroll after a tiny delay
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }, [pathname]);

    return null;
}