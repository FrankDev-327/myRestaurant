module.exports = {
    setHour: async () => {
        const date = new Date();
        return date.setHours(date.getHours() - 5);
    }
}