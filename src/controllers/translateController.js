class TranslateController {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    beautifyXml(xml) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        const serializer = new XMLSerializer();
        return serializer.serializeToString(xmlDoc);
    }

    async translateXml(xmlContent, targetLanguage) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
        const vietnameseElements = Array.from(xmlDoc.getElementsByTagName("Vietnamese"));
        const vietnameseTexts = vietnameseElements.map(element => element.textContent);
        const aggregatedText = vietnameseTexts.join(", ");

        if (!aggregatedText) {
            throw new Error("No 'Vietnamese' elements contain text.");
        }

        const translatedText = await this.translateText(aggregatedText, targetLanguage);
        const translatedTexts = translatedText.split(", ");

        vietnameseElements.forEach((element, index) => {
            const translatedSegment = translatedTexts[index] ? translatedTexts[index].trim() : '';
            const newElement = xmlDoc.createElement(targetLanguage);
            newElement.textContent = translatedSegment;
            element.parentNode.insertBefore(newElement, element.nextSibling);
        });

        const serializer = new XMLSerializer();
        return serializer.serializeToString(xmlDoc);
    }

    async translateText(text, targetLanguage) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;
        const requestBody = {
            contents: [{
                role: "user",
                parts: [{ text: `Dịch các từ "${text}" sang "${targetLanguage}"` }]
            }],
            systemInstruction: {
                role: "user",
                parts: [{ text: "Chỉ trả kết quả cho từng từ chia cắt theo từng dấu ," }]
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Error translating text: ${response.statusText}`);
        }

        const responseBody = await response.json();
        const candidates = responseBody.candidates || [];
        const translatedText = candidates.map(candidate => candidate.content.parts.map(part => part.text).join('')).join(', ');

        if (!translatedText) {
            throw new Error("Translated text cannot be null.");
        }

        return translatedText;
    }
}

export default TranslateController;