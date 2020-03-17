
const axios = require('axios');
const fs = require('fs');

module.exports = URLs => {
    URLs.forEach((url, idx) => {
        const split = url.split(", ");

        axios.get(split[1])
            .then(res => {
                var file = '';
                const book = { name: '', number: split[0], testament: "new", chapters: [] };

                Object.entries(res.data).forEach(obj => {
                    file = `${obj[0].replace(' ', '-')}.json`;
                    book.name = obj[0];
                    const chapters = [];

                    obj[1].forEach(chapterObj => {
                        const map = Object.entries(chapterObj);
                        chapters.push({ number: map[0][0], passages: map[0][1] });
                    });

                    book.chapters = chapters;
                });

                try {
                    fs.writeFileSync(`testaments/new/${file}`, JSON.stringify(book));
                    console.log(`Finished writing ${file}`);
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(err => console.log("There's an error."));
    });
}