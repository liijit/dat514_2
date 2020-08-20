//when using them with css you can set ${({ theme }) in their values
interface Colours {
	dark: string;
	light: string;
	grey: string;
	black: string;
	hover: string;
	mobile: string;
}

export const theme: Colours = {
	dark: "#0D0C1D",
	light: "#EFFFFA",
	grey: "#C5CBD3",
	black: "#000000",
	hover: "#343078",
	mobile: "576px",
};