'use client';

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef } from "react";

export default function UttrancesComments() {
    const ref = useRef(null);
    const { theme } = useTheme();

    const makeComments = () => {
        const scriptElem = document.createElement("script");
        scriptElem.src = "https://utteranc.es/client.js";
        scriptElem.async = false;
        scriptElem.crossOrigin = "anonymous";
        scriptElem.setAttribute(
            "repo",
            "Leehyunji0715/hj-blog-comments"
        );
        scriptElem.setAttribute("issue-term", "pathname");
        scriptElem.setAttribute("label", "blog-comment");
        scriptElem.setAttribute("theme", `github-${theme ?? "light"}`);
        ref.current.appendChild(scriptElem);
    };

    const removeExistedComments = useCallback(() => {
        const existingScript = ref.current.querySelector(".utterances");
        if (existingScript) {
            existingScript.remove();
        }
    }, []);

    useEffect(() => {
        makeComments();
        removeExistedComments();
    }, [theme]);

    return (
        <section
            ref={ref}
        />
    )
}