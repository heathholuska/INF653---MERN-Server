const State = require("../../model/State");

const data = {
	states: require("../../model/statesData.json"),
	setStates: function (data) { this.states = data }
	};

const getAllStates = async (req, res) => {
	const { contig } = req.query;
	let statesList = data.states;

	//Handle query parameter
	if (contig === "true") {
		statesList = data.states.filter(st => st.code !== 'AK' && st.code !== 'HI');
	} else if (contig === "false") {
		statesList = data.states.filter(st => st.code === 'AK' && st.code === 'HI');
	}

	const mongoStates = await State.find();
	const mergedResults = statesList.map(state => {
		const mongoData = mongoStates.find(ms => ms.stateCode === state.code);
		return mongoData ? { ...state, funfacts: mongoData.funfacts } : state;
	});

	res.json(mergedResults);

const getFunFact = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.states.find(st => st.code === stateCode);

	if (!state) return res.status(404).json({ "message": "Invalid state abbreviation"});
	
	const mongoState = await State.findOne({ stateCode }).exec();
	
	if (!mongoState || !mongoState.funfacts?.length) {
		return res.status(404).json({ "message": `No Fun Facts found for ${state.state}`});
	}

	//Return random fact
	const randomFact = mongoState.funfacts[Math.floor(Math.random() * mongoState.funfacts.length)];
	res.json({ "funfact": randomFact });
};

module.exports = { 
	getAllStates,
	getFunFact 
}};