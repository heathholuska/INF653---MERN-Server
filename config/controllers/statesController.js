const State = require("../../model/State");

const data = {
	states: require("../../model/statesData.json"),
	setStates: function (data) {
		this.states = data;
		let statesList = [...data.states];
	},
};

const getAllStates = async (req, res) => {
	const { contig } = req.query;
	let statesList = data.states;

	//Handle query parameter
	if (contig === "true") {
		statesList = data.states.filter(
			(st) => st.code !== "AK" && st.code !== "HI",
		);
	} else if (contig === "false") {
		statesList = data.states.filter(
			(st) => st.code === "AK" || st.code === "HI",
		);
	}

	const mongoStates = await State.find();
	const mergedResults = statesList.map((state) => {
		const mongoData = mongoStates.find((ms) => ms.stateCode === state.code);
		if (mongoData && mongoData.funfacts.length > 0) {
            return { ...state, funfacts: mongoData.funfacts };
        }
        return state;
	});

	res.json(mergedResults);
};

const getState = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find((st) => st.code === stateCode);

	if (!state)
		return res.status(404).json({ message: "Invalid State Abbreviation" });

	const mongoState = await State.findOne({ stateCode }).exec();

	let result = { ...state };
	if (mongoState) {
		result.funfacts = mongoState.funfacts;
	}
	
	
	res.json(state);
};

// GET Capital
const getCapital = (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find((st) => st.code === stateCode);

	if (!state)
		return res.status(404).json({ message: "Invalid State Abbreviation" });

	res.json({ state: state.state, capital: state.capital_city });
};

const getNickname = (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find((st) => st.code === stateCode);

	if (!state)
		return res.status(404).json({ message: "Invalid State Abbreviation" });
	res.json({ state: state.state, nickname: state.nickname });
};
const getPopulation = (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find((st) => st.code === stateCode);

	if (!state)
		return res.status(404).json({ message: "Invalid State Abbreviation" });
	res.json({ state: state.state, population: state.population.toLocaleString("en-US") });
};

const getAdmission = (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find((st) => st.code === stateCode);

	if (!state)
		return res.status(404).json({ message: "Invalid State Abbreviation" });
	res.json({ state: state.state, admitted: state.admission_date });
};

const getRandomFunFact = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find((st) => st.code === stateCode);

	if (!state)
		return res.status(404).json({ message: "Invalid state abbreviation" });

	const mongoState = await State.findOne({ stateCode }).exec();

	if (!mongoState || !mongoState.funfacts?.length) {
		return res
			.status(404)
			.json({ message: `No Fun Facts found for ${state.state}` });
	}

	//Return random fact
	const randomFact =
		mongoState.funfacts[Math.floor(Math.random() * mongoState.funfacts.length)];
	res.json({ funfact: randomFact });
};

const addFunFacts = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find((st) => st.code === stateCode);

	if (!state)
		return res.status(404).json({ message: "Invalid State Abbreviation" });

	const { funfacts } = req.body;

	if (!funfacts)
		return res.status(400).json({ message: "State Fun Facts Value Required" });
	if (!Array.isArray(funfacts))
		return res
			.status(400)
			.json({ message: "State fun facts value must be an array" });

	let mongoState = await State.findOne({ stateCode }).exec();

	if (!mongoState) {
		mongoState = await State.create({
			stateCode: stateCode,
			funfacts: funfacts,
		});
	} else {
		mongoState.funfacts.push(...funfacts);
		await mongoState.save();
	}
	res.json(mongoState);
};

const updateFunFact = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find((st) => st.code === stateCode);
	if (!state)
		return res
			.status(404)
			.json({ message: "Invalid state abbreviation parameter" });

	const { index, funfact } = req.body;

	if (!index)
		return res
			.status(400)
			.json({ message: "State fun fact index value required" });
	if (!funfact)
		return res.status(400).json({ message: "State fun fact value required" });

	const mongoState = await State.findOne({ stateCode }).exec();

	if (!mongoState || mongoState.funfacts.length === 0) {
		return res
			.status(404)
			.json({ message: `No Fun Facts found for ${state.state}` });
	}

	const arrayIndex = index - 1; // Assuming user inputs a 1-based index (e.g., 1 for the first fact)
	if (arrayIndex < 0 || arrayIndex >= mongoState.funfacts.length) {
		return res
			.status(404)
			.json({ message: `No Fun Fact found at that index for ${state.state}` });
	}

	// Update the specific index
	mongoState.funfacts[arrayIndex] = funfact;
	await mongoState.save();

	res.json(mongoState);
};

const deleteFunFact = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find((st) => st.code === stateCode);
	if (!state)
		return res
			.status(404)
			.json({ message: "Invalid state abbreviation parameter" });

	const { index } = req.body;

	if (!index)
		return res
			.status(400)
			.json({ message: "State fun fact index value required" });

	const mongoState = await State.findOne({ stateCode }).exec();

	if (!mongoState || mongoState.funfacts.length === 0) {
		return res
			.status(404)
			.json({ message: `No Fun Facts found for ${state.state}` });
	}

	const arrayIndex = index - 1; // Assuming user inputs a 1-based index
	if (arrayIndex < 0 || arrayIndex >= mongoState.funfacts.length) {
		return res
			.status(404)
			.json({ message: `No Fun Fact found at that index for ${state.state}` });
	}

	// Remove 1 item at the specified array index
	mongoState.funfacts.splice(arrayIndex, 1);
	await mongoState.save();

	res.json(mongoState);
};

module.exports = {
	getState,
	getAllStates,
	getCapital,
	getNickname,
	getPopulation,
	getAdmission,
	getRandomFunFact,
	addFunFacts,
	updateFunFact,
	deleteFunFact,
};
