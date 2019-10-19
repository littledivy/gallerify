const colors = require("colors");
const bold = colors.bold;
const italic = colors.italic;
const underline = colors.underline;

class Logger {
    constructor(opt) {
        this.opt = opt;
    }
    success(msg) {
        console.log(`${bold(colors.green(msg))}   - ${colors.grey("YAYY")}`)
        return new Logger(this.opt);
    }
    warning(msg) {
        console.log(`${bold(colors.yellow(msg))}   - ${colors.grey("OK")} `)
        return new Logger(this.opt);
    }
    info(msg) {
        console.log(`${bold(colors.blue(msg))}   - ${colors.grey("INFO")} `)
        return new Logger(this.opt);
    }
    danger(msg) {
        console.log(`${bold(colors.red(msg))}   - ${colors.grey("OOPS")} `)
        return new Logger(this.opt);
    }
    end(url) {
        console.log(`${bold(italic(colors.green(`Open ${underline(colors.blue(url))} ${colors.green("in your browser and enjoy!")}`)))}   - ${colors.grey("SUCCESS")} `)
        console.log('Made with love by @DivySrivastava')
    }
};

module.exports = Logger;