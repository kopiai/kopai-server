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

const getCoffeeBlend = async (request, h) => {
	const { coffee1, percentage1, coffee2 } = request.payload;
	const percentage2 = 100 - percentage1;

	try {
		const blendDescription = `Buat deskripsi rasa dari campuran kopi ${coffee1} (${percentage1}%) dan ${coffee2} (${percentage2}%)`;
		const { response } = await model.generateContent([
			`Bertindaklah sebagai barista di sebuah kedai kopi yang nyaman. Jawab tanpa menambahkan pertanyaan baru. Jawab pertanyaan berikut: ${blendDescription}`,
		]);

		return { funFact: response.text() };
	} catch (error) {
		console.error(error);
		return h
			.response({ error: "Terjadi kesalahan saat mengambil fun fact." })
			.code(500);
	}
};

const getCoffeeRoasting = async (request, h) => {
	const { payload } = request;
	const file = payload.file;

	if (!file) {
		return h.response({ error: "Harap unggah file gambar." }).code(400);
	}

	// Save the uploaded file to a temporary location
	const tempFilePath = path.join(__dirname, "uploads", file.hapi.filename);
	const fileStream = fs.createWriteStream(tempFilePath);

	await new Promise((resolve, reject) => {
		file.pipe(fileStream);
		file.on("end", resolve);
		file.on("error", reject);
	});

	try {
		// Convert image to base64
		const base64Image = fs.readFileSync(tempFilePath, { encoding: "base64" });
		const image = {
			inlineData: {
				data: base64Image,
				mimeType: file.hapi.headers["content-type"],
			},
		};

		// Prepare prompt for classification
		const prompt =
			"Bertindaklah sebagai barista di sebuah kedai kopi yang nyaman. Jawab tanpa menambahkan pertanyaan baru. Jawab pertanyaan dengan pilihan Light Roast, Medium Roast, Medium-Dark Roast, dan Dark Roast. Jika gambar tidak mengandung biji kopi maka jawab dengan 'Maaf Gambar bukan termasuk Biji Kopi'. Klasifikasikan Jenis Roasting Kopi berdasarkan gambar yang dikirimkan.";

		// Generate content using the AI model
		const { response } = await model.generateContent([prompt, image]);

		const classification =
			response.text || "Maaf Gambar bukan termasuk Biji Kopi.";
		return h.response({ classification }).code(200);
	} catch (error) {
		console.error(error);
		return h.response({ error: "Gagal mengklasifikasikan gambar." }).code(500);
	} finally {
		// Clean up temporary file
		fs.unlink(tempFilePath, (err) => {
			if (err) console.error(`Error removing temp file: ${err.message}`);
		});
	}
};

module.exports = {
	getCoffeeFunFact,
	getCoffeeBlend,
	getCoffeeRoasting,
};
