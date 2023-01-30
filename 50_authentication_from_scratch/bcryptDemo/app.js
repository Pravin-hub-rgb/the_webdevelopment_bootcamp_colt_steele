const bcrypt = require('bcrypt')

// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(10) // 10 = saltrounds
//     const hash = await bcrypt.hash(pw, salt)
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12)
    console.log(hash);
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw)
    if (result) {
        console.log("logged you in! Successful Match!");
    } else {
        console.log("Incorrect!");
    }
}

// hashPassword('monkey')
login('monkey', '$2b$10$rzhTWyh84ySuIfBVdSKgCecXnbYfCKiWOqIS5MbTHhj2foMgc9Geu')

// salt - $2b$10$rzhTWyh84ySuIfBVdSKgCe
// hash - $2b$10$rzhTWyh84ySuIfBVdSKgCecXnbYfCKiWOqIS5MbTHhj2foMgc9Geu

// logs - logged you in! Successful Match!