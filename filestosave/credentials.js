const allowedOrigins = [
	"https://nameofproject.me",
	"http://127.0.0.1:5500",
	"http://localhost:3500",
];

const credentials = (req, res, next) => {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.header("Access-Control-Allow_Credentials", true);
	}
	next();
};

module.exports = credentials;
