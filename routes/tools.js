var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get("/", async (req, res) => {
    var controller = req.query.controllerName;
    var actionName = req.query.actionName;
    res.locals.err = "";
    try {
        fs.readFileSync(`./routes/${controller}.js`)
    } catch (error) {
        res.locals.err = "contrller không tồn tại";
        res.render("tools/index");
        return;
    }
    if (controller != null && actionName != null) {

        fs.readFile(`./routes/${controller}.js`, (err, data) => {
            if (err) res.locals.err = err;

            var content = data.toString();

            fs.readFile(`./templates/action.txt`, (err, dataTemplate) => {
                if (err) res.locals.err = err;

                var appendContent = dataTemplate.toString();

                appendContent = appendContent.replace(/action_name/g, actionName);
                appendContent = appendContent.replace(/controller_name/g, controller);

                content = content.replace("//[end]", appendContent);

                fs.writeFile(`./routes/${controller}.js`, content, (err, dataTemplate) => {
                    if (err) {
                        res.locals.err = err
                    }
                    else {
                        console.log("change!");
                    };
                });

            })
        });

        fs.readFile(`./templates/app_config.txt`, (err, dataTemplate) => {
            if (err) res.locals.err = err;

            fs.writeFile(`./app_config/${controller}${actionName}Script.js`, dataTemplate, function (err, file) {
                if (err) res.locals.err = err;
                console.log('script config created!');
            });

            fs.writeFile(`./app_config/${controller}${actionName}Style.js`, dataTemplate, function (err, file) {
                if (err) res.locals.err = err;
                console.log('style config created!');
            });
        })

        var dir = `./views/${controller}/${actionName}`;

        fs.exists(dir, (exists) => {
            if (exists) {
                fs.writeFile(dir + "/index.ejs", "", function (err, file) {
                    if (err) {
                        res.locals.err = err;
                    } else {
                        console.log('view created!');
                    }
                });
            } else {
                fs.mkdir(`./views/${controller}`, (err) => {
                    fs.mkdir(`./views/${controller}/${actionName}`, (err) => {
                        fs.writeFile(dir + "/index.ejs", "", function (err, file) {
                            if (err) {
                                res.locals.err = err;
                            } else {
                                console.log('view created!');
                            }
                        });
                    })
                })
            }
        });

    }
    res.locals.err = "đã tạo";
    res.render("tools/index");
})


module.exports = router;