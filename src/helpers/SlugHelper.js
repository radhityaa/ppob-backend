import slug from "slug";
import RandomString from "../utils/RandomString.js";

export default function Slug(text, length) {
    return slug(`${text}-${RandomString(length)}`)
}