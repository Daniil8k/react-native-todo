export default function getTime(date) {
    return new Date(date).toLocaleTimeString().substring(0, 5);
}