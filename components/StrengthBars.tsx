import { StrengthBarsProps } from "@/utils/types";
import { useState, useEffect } from "react";

const StrengthBars = ({ strength }: StrengthBarsProps) => {
    const [fillColor, setFillColor] = useState<string | null>(null);
    const [displayText, setDisplayText] = useState<string | null>(null);

    useEffect(() => {
        const determineFillColorAndText = (strength: number) => {
            let color: string | null = null;
            let text: string | null = null;
            switch (strength) {
                case 1:
                    color = '#F64A4A';
                    text = 'too weak!';
                    break;
                case 2:
                    color = "#FB7C58";
                    text = 'weak';
                    break;
                case 3:
                    color = "#F8CD64";
                    text = 'medium';
                    break;
                case 4:
                    color = "#A4FFAF";
                    text = 'strong';
                    break;
                default:
                    color = null;
                    text = null;
            }
            setFillColor(color);
            setDisplayText(text);
        };

        determineFillColorAndText(strength);
    }, [strength]);

    const rectangles = Array(4).fill(null);

    return (
        <div>
            <div className="flex justify-end items-center gap-4 ">
                <div className="uppercase text-[24px] md:text-[32px]">
                    {displayText}
                </div>

                <div className="flex space-x-2">
                    {rectangles.map((_, index) => (
                        <svg
                            className="cursor-pointer"
                            key={index}
                            width="10"
                            height="28"
                            viewBox="0 0 10 28"
                            fill={index < strength ? fillColor ?? '' : ''}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="1"
                                y="1"
                                width="8"
                                height="26"
                                stroke={index < strength ? fillColor ?? "#E6E5EA" : "#E6E5EA"}
                                strokeWidth="2"
                            />
                        </svg>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StrengthBars;
