export interface DataType {
	key: React.Key;
	firstName: string;
	lastName: string;
	age: number;
	address: string;
	tags: string[];
}

const firstNames = [
	"John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Lisa",
	"William", "Jennifer", "James", "Mary", "Christopher", "Patricia", "Daniel",
	"Linda", "Matthew", "Elizabeth", "Anthony", "Barbara", "Mark", "Susan",
	"Donald", "Jessica", "Steven", "Karen", "Paul", "Nancy", "Andrew", "Betty",
	"Joshua", "Helen", "Kenneth", "Sandra", "Kevin", "Donna", "Brian", "Carol",
	"George", "Ruth", "Timothy", "Sharon", "Ronald", "Michelle", "Jason", "Laura",
	"Edward", "Sarah", "Jeffrey", "Kimberly", "Ryan", "Deborah", "Jacob", "Dorothy"
];

const lastNames = [
	"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
	"Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
	"Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
	"White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
	"Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
	"Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell"
];

const cities = [
	"New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
	"San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
	"Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle",
	"Denver", "Washington", "Boston", "El Paso", "Nashville", "Detroit", "Oklahoma City",
	"Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque"
];

const streets = [
	"Main St", "Oak Ave", "Park Rd", "Lake Park", "First St", "Second Ave", "Third Blvd",
	"Elm Street", "Maple Ave", "Cedar Rd", "Pine St", "Washington Ave", "Lincoln Blvd",
	"Jefferson St", "Madison Ave", "Monroe Rd", "Adams St", "Jackson Ave", "Harrison Blvd"
];

const allTags = [
	"developer", "designer", "manager", "analyst", "engineer", "consultant", "specialist",
	"coordinator", "administrator", "supervisor", "director", "executive", "intern",
	"senior", "junior", "lead", "principal", "associate", "assistant", "freelancer",
	"remote", "onsite", "fulltime", "parttime", "contract", "permanent", "temporary",
	"experienced", "beginner", "expert", "professional", "certified", "skilled",
	"creative", "analytical", "technical", "strategic", "innovative", "collaborative",
	"nice", "cool", "awesome", "great", "excellent", "outstanding", "remarkable",
	"talented", "dedicated", "motivated", "ambitious", "reliable", "efficient"
];

// Function to generate random data
function generateTableData(count: number): DataType[] {
	const data: DataType[] = [];

	for (let i = 1; i <= count; i++) {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		const city = cities[Math.floor(Math.random() * cities.length)];
		const street = streets[Math.floor(Math.random() * streets.length)];
		const streetNumber = Math.floor(Math.random() * 9999) + 1;
		const age = Math.floor(Math.random() * 50) + 18; // Age between 18-67

		const numTags = Math.floor(Math.random() * 4) + 1;
		const tags: string[] = [];
		const usedTags = new Set<string>();

		while (tags.length < numTags) {
			const tag = allTags[Math.floor(Math.random() * allTags.length)];
			if (!usedTags.has(tag)) {
				tags.push(tag);
				usedTags.add(tag);
			}
		}

		data.push({
			key: i.toString(),
			firstName,
			lastName,
			age,
			address: `${city} No. ${streetNumber} ${street}`,
			tags
		});
	}

	return data;
}

export const tableData: DataType[] = generateTableData(10000); 