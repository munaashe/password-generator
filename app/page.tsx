'use client';
import { useState, ChangeEvent, MouseEvent } from 'react';
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

const Home = () => {
  const [conditionValues, setConditionValues] = useState<ConditionValues>(initialState);
  const [characterLength, setCharacterLength] = useState<number>(6);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, checked } = target;
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
    setIsCopied(false);
    const newPassword = generatePassword(conditionValues, characterLength);
    setGeneratedPassword(newPassword);
  };

  const handleCopyPassword = (event: MouseEvent<SVGSVGElement>) => {
    navigator.clipboard.writeText(generatedPassword!)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => console.error('Failed to copy password: ', err));
  };

  const passwordStrength = determinePasswordStrength(conditionValues);
  const trackBackground = `linear-gradient(to right, #a4ffaf ${((characterLength - 6) / (50 - 6)) * 100}%, #18171f ${((characterLength - 6) / (50 - 6)) * 100}%)`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white bg-black">
      <div className="max-w-[540px] w-full p-4">
        <div className="w-full text-center text-gray-2">
          Password Generator
        </div>
        <div className="my-4 bg-gray-3 p-4 flex items-center justify-between">
          <div className={`flex-1 max-w-[360px] px-4 ${generatedPassword ? 'text-white' : 'text-gray-2'}`} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {generatedPassword ?? 'P4$5W0rD!'}
          </div>
          <div className='flex items-center gap-4 px-4 justify-end'>
            {isCopied && <span className="text-gray-2 uppercase text-green">copied</span>}
            <svg
              onClick={handleCopyPassword}
              width="21"
              height="24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z" fill="#A4FFAF" />
            </svg>
          </div>
        </div>
        <div className="bg-gray-3 p-4 md:p-8">
          <div>
            <div className="flex w-full justify-center my-2">
              <div className="flex-1">
                Character Length
              </div>
              <div className='text-green text-[32px] md:text-[42px]'>{characterLength}</div>
            </div>
            <input
              id="default-range"
              type="range"
              min="6"
              max="50"
              value={characterLength}
              onChange={handleSliderChange}
              className="range-slider w-full"
              style={{ background: trackBackground }}
            />
          </div>
          <div>
            {conditions.map((condition) => (
              <div key={condition.name} className="flex items-center justify-start gap-4 my-4">
                <label className="relative flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="relative peer shrink-0 appearance-none border-2 border-white hover:border-green h-5 w-5 checked:bg-green checked:border-green checked:text-white"
                    name={condition.name}
                    checked={conditionValues[condition.name as keyof ConditionValues]}
                    onChange={handleChange}
                  />
                  <div
                    className="absolute ml-1 transition-opacity peer-checked:block peer-checked:opacity-100 peer-not-checked:opacity-0"
                  >
                    <img src="/assets/images/icon-check.svg" alt="" />
                  </div>
                </label>
                <div className='text-[21px]'>
                  {condition.displayText}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-black p-4 flex items-center justify-between mt-4">
            <div className="uppercase text-gray-2 text-[21px] md:text-[24px]">
              Strength
            </div>
            <StrengthBars strength={passwordStrength} />
          </div>
          <div
            className="w-full mt-8 py-4 text-black bg-green hover:text-green hover:bg-gray-3 hover:border-[1px] hover:border-green uppercase flex items-center justify-center gap-4 cursor-pointer fill-[#24232C] hover:fill-[#A4FFAF]"
            onClick={handleGeneratePassword}
          >
            <div className='text-[21px] md:text-[24px] font-semibold'>
              Generate
            </div>
            <svg
              width="12"
              height="12"
              className=""
              xmlns="http://www.w3.org/2000/svg">
              <path d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
