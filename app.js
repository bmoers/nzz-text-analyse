
const express = require('express');
const app = express();


app.set('views', './views')
app.set('view engine', 'ejs');

const text = require('./text.json');

const persons = text.map((p)=> {

    const title = p.title;

    const open = (title.match(/\(/g) || []).length;
    const close = (title.match(/\)/g) || []).length;

    if (open != close) {
        p.klammer = true;
        p.check = true;
        
    }

    const twoComma = (title.match(/\(.*,.*,.*\)/g) || []).length;
    
    if(twoComma > 0) {
        p.twoComma = true;
        p.check = true;
        
    }

    const noComma = (title.match(/\([^,]*\)/g) || []).length;
    if (noComma > 0) {
        p.noComma = true;
        p.check = true;
        
    }

    const noCommaName = (title.match(/^[^,]+\s+\(.*\)/gm) || []).length;
    if (noCommaName > 0) {
        p.noCommaName = true;
        p.check = true;
        
    }

    const hasPunkt = title.toLowerCase().replace(/\bdr\b\./, '').replace(/\bprof\b\./, '').includes('.')
    if (hasPunkt > 0) {
        p.punkt = true;
        p.check = true;        
    }

    // v1 = [^,]+\s?(?:\,\s[^,]+)+\s\([^,/]+\s?(?:[,/]+\s[^,/]+)\)
    const pattern = (title.match(/[^,]+(?:\,[^,]+)+\s\([^,/]+([/,][^,/]+)+\)/g) || []).length;
    if (pattern == 0) {
        p.pattern = true;
        p.check = true;
    }
    return p;
})


// (?:[,/\s]+[^,/]+)\)

app.get('/', function (req, res) {
    res.render('index', { persons: persons});
});

app.listen(3000, function () {
    console.log('Listening to PORT 3000')
})
