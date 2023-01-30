import {franc} from "franc";
import langs from "langs";
const langArgs = process.argv[2]; 
const langCode = franc(langArgs);
if(langCode === 'und'){
    console.log("sorry, we couldn't figure it out! try with more sample text");
} else {
    const language = langs.where("3", langCode);
    console.log(language.name);
}