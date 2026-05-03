// config/corsoptions.js
const allowedOrigins = [
	"https://inf653-mern-server.onrender.com",
	"http://127.0.0.1:5500",
	"http://localhost:3500",
];

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
