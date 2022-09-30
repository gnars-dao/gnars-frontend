module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				brick: ['brick'],
				boloon: ['boloon'],
				craft: ['craft'],
				Shadeerah: ['Shadeerah'],
				primary: 'PT Root UI',
				secondary: 'Londrina Solid',
			},
			fontSize: {
				'15px': '15px',
				'16px': '16px',
				'18px': '18px',
				'20px': '20px',
				'24px': '24px',
				'25px': '25px',
				'28px': '28px',
				'32px': '32px',
				'42px': '42px',
				'56px': '56px',
			},
			lineHeight: {
				'42px': '42px',
			},
			listStyleType: {
				circle: 'circle',
			},
			colors: {
				primary: '#e9ebf3',
				primaryText: '#151c3b',
				secondaryText: '#79809c',
				tertiaryText: '#5f5f5f',
				bidsFor: '#8c8d92',
				primaryBackground: '#d5d7e1',
				modalBackground: '#f4f4f8',
				hoverLight: '#fafafb',
				hoverBlue: '#4965f0',
				hoverRed: '#d63c5e',
				borderColor: '#bdc0cf',
				inherit: 'inherit',
			},
			height: {
				'20px': '20px',
				'32px': '32px',
			},
			width: {
				'20px': '20px',
				'32px': '32px',
				'190px': '190px',
			},
			minWidth: {
				'190px': '190px',
			},
			maxHeight: {
				'40px': '40px',
				'96px': '96px',
				'180px': '180px',
			},
			maxWidth: {
				'96px': '96px',
				'200px': '200px',
				'250px': '250px',
				'450px': '450px',
				'478px': '478px',
				'565px': '565px',
				'570px': '570px',
				'1116px': '1116px',
				'1536px': '1536px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
