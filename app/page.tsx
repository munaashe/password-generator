'use client';
import { useState, ChangeEvent } from 'react';
import StrengthBars from '@/components/StrengthBars';
import { ConditionValues, PasswordCondition } from '@/utils/types';

const conditions: PasswordCondition[] = [
  { name: 'uppercaseLetters', displayText: 'Include Uppercase Letters' },
  { name: 'lowercaseLetters', displayText: 'Include Lowercase Letters' },
  { name: 'numbers', displayText: 'Include Numbers' },
  { name: 'symbols', displayText: 'Include Symbols' },
];

const initialState: ConditionValues = {
  uppercaseLetters: false,
  lowercaseLetters: false,
  numbers: false,
  symbols: false,
};

const determinePasswordStrength = (conditionValues: ConditionValues): number => {
  const { uppercaseLetters, lowercaseLetters, numbers, symbols } = conditionValues;
  let strength = 0;
  if (lowercaseLetters) strength += 1;
  if (uppercaseLetters) strength += 1;
  if (numbers) strength += 1;
  if (symbols) strength += 1;
  return strength;
};

const generatePassword = (conditionValues: ConditionValues, length: number): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

  let availableChars = '';
  if (conditionValues.lowercaseLetters) availableChars += lowercase;
  if (conditionValues.uppercaseLetters) availableChars += uppercase;
  if (conditionValues.numbers) availableChars += numbers;
  if (conditionValues.symbols) availableChars += symbols;

  if (availableChars.length === 0) return '';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  return password;
};

export default function Home() {
  const [conditionValues, setConditionValues] = useState<ConditionValues>(initialState);
  const [characterLength, setCharacterLength] = useState<number>(6);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setConditionValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const length = parseInt(event.target.value, 10);
    if (length >= 6 && length <= 50) {
      setCharacterLength(length);
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(conditionValues, characterLength);
    setGeneratedPassword(newPassword);
  };

  const passwordStrength = determinePasswordStrength(conditionValues);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white bg-black">
      <div className="max-w-[540px] w-full p-4">
        <div className="w-full text-center text-gray-2">
          Password Generator
        </div>
        <div className="my-4 bg-gray-3 p-4">
          {generatedPassword}
        </div>
        <div className="bg-gray-3 p-4 md:p-8">
          <div>
            <div className="flex w-full justify-center">
              <div className="flex-1">
                Character Length
              </div>
              <div>{characterLength}</div>
            </div>
            <input
              id="default-range"
              type="range"
              min="6"
              max="50"
              value={characterLength}
              onChange={handleSliderChange}
              className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            {conditions.map((condition) => (
              <div key={condition.name} className="flex items-center justify-start gap-4">
                <input
                  type="checkbox"
                  name={condition.name}
                  checked={conditionValues[condition.name as keyof ConditionValues]}
                  onChange={handleChange}
                />
                <div>
                  {condition.displayText}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-black p-4 flex items-center justify-between">
            <div className="uppercase text-gray-2">
              Strength
            </div>
            <StrengthBars strength={passwordStrength} />
          </div>
          <div
            className="w-full mt-8 py-4 text-black bg-green uppercase flex items-center justify-center gap-4 cursor-pointer"
            onClick={handleGeneratePassword}
          >
            <div>
              Generate
            </div>
            <img src='/assets/images/icon-arrow-right.svg' alt="" />
          </div>
        </div>
      </div>
    </main>
  );
}
