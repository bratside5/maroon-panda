import { type ClassValue, clsx } from 'clsx';
import { cwd } from 'process';
import { twMerge } from 'tailwind-merge';

function getTimestampNow() {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  return timestamp ? timestamp : null;
}

export async function timeout(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currentTime = getTimestampNow();
export const currentDir = cwd();
