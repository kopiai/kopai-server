const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getCoffeeFunFact = async (request, h) => {
	const coffeeName = request.query.name;
	if (!coffeeName) {
		return h.response({ error: "Nama kopi tidak diberikan." }).code(400);
	}

	try {
		const question = `Buat Fun Fact mengenai kopi ${coffeeName}`;
		const { response } = await model.generateContent([
			`Bertindaklah sebagai barista di sebuah kedai kopi yang nyaman. Jawab tanpa menambahkan pertanyaan baru. Jawab pertanyaan berikut: ${question}`,
		]);

		return { funFact: response.text() };
	} catch (error) {
		console.error(error);
		return h
			.response({ error: "Terjadi kesalahan saat mengambil fun fact." })
			.code(500);
	}
};

module.exports = {
	getCoffeeFunFact,
};
