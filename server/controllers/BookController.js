
const fs = require('fs');
const getBooksFromTestament = testament => {
    const prefix = `testaments/${testament}`;
    return fs.readdirSync(prefix).map(file => JSON.parse(fs.readFileSync(`./${prefix}/${file}`)));
}

module.exports.getAll = (req, res) => {
    const allBooks = getBooksFromTestament("old").concat(getBooksFromTestament("new"));
    res.json({ count: allBooks.length, books: allBooks });
}

module.exports.getBooks = (req, res) => {
    const { keyword } = req.params;

    const oldTst = fs.readdirSync("testaments/old");
    const newTst = fs.readdirSync("testaments/new");
    const all = oldTst.concat(newTst);

    switch (keyword) {
        case "list":
            return res.json(all.map(file => file.replace(".json", "")));
        case "random":
            const allBooks = getBooksFromTestament("old").concat(getBooksFromTestament("new"));
            const idx = Math.floor(Math.random() * allBooks.length);
            return res.json({ count: allBooks.length, books: allBooks[idx] });
        case "old-testament":
            const oldTestament = getBooksFromTestament("old");
            return res.json({ testament: "Old Testament", count: oldTestament.length, books: oldTestament });
        case "new-testament":
            const newTestament = getBooksFromTestament("new");
            return res.json({ testament: "New Testament", count: newTestament.length, books: newTestament });
    }

    try {
        const comparedName = keyword.replace(/ /g, '-').toUpperCase();
        const file = all.filter(fileName => fileName.includes(comparedName))[0];
        const prefix = `./testaments/${oldTst.includes(file) ? "old" : "new"}`;
        const foundBook = JSON.parse(fs.readFileSync(`${prefix}/${file}`));
        return res.json({ book: foundBook });
    } catch {
        return res.json({ message: "Book not found", keyword: keyword, book: null });
    }
}

module.exports.getAbout = (req, res) => {
    const oldTst = fs.readdirSync("testaments/old");
    const newTst = fs.readdirSync("testaments/new");
    const all = oldTst.concat(newTst);

    return res.json({
        version: "Kinh Thánh Bản Dịch 2011",
        author: "MS Đặng Ngọc Báu",
        lastUpdatedAt: new Date().valueOf(),
        books: {
            oldTestament: "http://localhost:8000/api/books/old-testament",
            newTestament: "http://localhost:8000/api/books/new-testament",
            names: all.map(file => file.replace(".json", ""))
        }
    });
}