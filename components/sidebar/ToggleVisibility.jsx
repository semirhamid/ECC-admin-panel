"use client"
// ToggleVisibility.js
import React, { useEffect } from 'react';

const ToggleVisibility = ({ toggleButtonId, contentDivId }) => {
    useEffect(() => {
        const toggleButton = document.getElementById(toggleButtonId);
        const contentDiv = document.getElementById(contentDivId);

        const handleClick = () => {
            contentDiv.classList.toggle('hidden');
        };

        if (toggleButton && contentDiv) {
            toggleButton.addEventListener('click', handleClick);
        }

        return () => {
            if (toggleButton) {
                toggleButton.removeEventListener('click', handleClick);
            }
        };
    }, [toggleButtonId, contentDivId]);

    return null; // This component doesn't render anything, it's just for handling side effects
};

export default ToggleVisibility;

