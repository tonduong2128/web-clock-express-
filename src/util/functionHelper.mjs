export default {
    strFormat: (str, length) => {
        if (str.length > length) {
            return str.slice(0, length) + "...";
        } else {
            return str;
        }
    },
    compareTo: (a, b) => {
        return a == b;
    }
}