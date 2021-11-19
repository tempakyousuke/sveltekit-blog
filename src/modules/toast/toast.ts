import { toast as stoast } from '@zerodevx/svelte-toast';

export const toast = {
	info: (message: string): void => {
		stoast.push(message, {
			theme: {
				'--toastBackground': '#3181D5',
				'--toastBarBackground': '#8BC4FF'
			}
		});
	},
	success: (message: string): void => {
		stoast.push(message, {
			theme: {
				'--toastBackground': '#48BB78',
				'--toastBarBackground': '#2F855A'
			}
		});
	},
	error: (message: string): void => {
		stoast.push(message, {
			theme: {
				'--toastBackground': '#F56565',
				'--toastBarBackground': '#C53030'
			}
		});
	}
};
