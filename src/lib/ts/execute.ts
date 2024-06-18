import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const selectedOption: Writable<string> = writable('Strip');
export let dataFile: File | null = null;
export let refFile: File | null = null;

export const handleSelectChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  selectedOption.set(target.value);
};

export const handleDataFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    dataFile = target.files[0];
  }
};

export const handleRefFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    refFile = target.files[0];
  }
};

export const execute = async() => {
  selectedOption.subscribe(value => {
    if (value === 'Strip') {
      
      // console.log('Selected option: Strip');
      // console.log('Data file:', dataFile);
      // console.log('Ref file:', refFile);
      
    } else if (value === 'Disk') {
      
      // console.log('Selected option: Disk');
      // console.log('Data file:', dataFile);
      // console.log('Ref file:', refFile);
      
    }
  })();
};
