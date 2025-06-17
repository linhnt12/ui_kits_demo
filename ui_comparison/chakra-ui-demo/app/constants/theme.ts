import { useColorModeValue } from "@/components/ui/color-mode";

export const useThemeColors = () => {
	const bgColor = useColorModeValue('white', 'gray.800');
	const headerBg = useColorModeValue('gray.800', 'gray.800');
	const borderColor = useColorModeValue('gray.200', 'gray.400');
	const rowBg = useColorModeValue('white', 'gray.800');
	const alternateRowBg = useColorModeValue('gray.50', 'gray.700');
	const textColor = useColorModeValue('gray.800', 'white');
	const inputBorderColor = useColorModeValue('gray.200', 'gray.400');
	const inputFocusBorderColor = useColorModeValue('blue.500', 'blue.300');
	const cardBorderColor = useColorModeValue('gray.200', 'gray.400');
	const hoverBg = useColorModeValue('gray.700', 'gray.700');
	const sidebarBg = useColorModeValue('gray.800', 'gray.800');

	return {
		bgColor,
		headerBg,
		borderColor,
		rowBg,
		alternateRowBg,
		textColor,
		inputBorderColor,
		inputFocusBorderColor,
		cardBorderColor,
		hoverBg,
		sidebarBg,
	};
}; 