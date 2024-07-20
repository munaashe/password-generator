import React, { SetStateAction } from "react";

export type PasswordCondition = {
    name: keyof ConditionValues;
    displayText: string;
};

export type ConditionValues = {
    uppercaseLetters: boolean;
    lowercaseLetters: boolean;
    numbers: boolean;
    symbols: boolean;
};

export type StrengthBarsProps = {
    strength: number;
};