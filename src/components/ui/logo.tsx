import React from "react";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string; // Explicitly included for clarity, though extended
}

export function Logo({ className, ...props }: LogoProps) {
    return (
        <img
            src="/logo.png"
            alt="CollabSphere Logo"
            className={className}
            {...props}
        />
    );
}
