import { useState, useEffect, useCallback } from 'react';

export const useTypewriter = ({
    words,
    loop = true,
    typeSpeed = 100,
    deleteSpeed = 50,
    delaySpeed = 2000
}) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayText, setDisplayText] = useState('');

    const handleTyping = useCallback(() => {
        if (!words || words.length === 0) return;

        const currentWord = words[index];

        if (!isDeleting && subIndex < currentWord.length) {
            // Typing
            setDisplayText(currentWord.substring(0, subIndex + 1));
            setSubIndex(prev => prev + 1);
        } else if (isDeleting && subIndex > 0) {
            // Deleting
            setDisplayText(currentWord.substring(0, subIndex - 1));
            setSubIndex(prev => prev - 1);
        } else if (!isDeleting && subIndex === currentWord.length) {
            // Wait at end of word
            setTimeout(() => setIsDeleting(true), delaySpeed);
        } else if (isDeleting && subIndex === 0) {
            // Move to next word
            setIsDeleting(false);
            setIndex((prev) => (loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)));
        }
    }, [index, subIndex, isDeleting, words, loop, delaySpeed]);

    useEffect(() => {
        if (words.length === 0) return;

        // Don't set timeout if we are waiting at the end of a word or start of a word
        const currentWord = words[index];
        const isWaitingAtEnd = !isDeleting && subIndex === currentWord.length;
        const isWaitingAtStart = isDeleting && subIndex === 0;

        if (isWaitingAtEnd || isWaitingAtStart) return;

        const timeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
        return () => clearTimeout(timeout);
    }, [handleTyping, isDeleting, deleteSpeed, typeSpeed, words, index, subIndex]);

    return { displayText };
};
