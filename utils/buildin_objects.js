const { setHour } = require('./dates.function');
const { hashingPassword } = require('../utils/my_bcrypt');

module.exports = {
    buildCreateAttending: async (params) => {
        return {
            waiterId: params.waiterId, //debería ser por medio del payload
            actualTableAttending: params.actualTableAttending,
            prices: params.prices,
            orders: params.orders,
            waiterId: params.waiterId,
            tableId: params.tableId,
            dateAttending: await setHour(),
            statusAttending: true
        }
    },
    toDoNewWaiter: async (params) => {
        const pass = await hashingPassword(params.password);
        var info = {
            firstName: params.firstName,
            lastName: params.lastName,
            password: pass,
            cellphone: params.cellphone,
            sex: params.sex,
            waiterImage: params.waiterImage,
            waiterName: params.waiterName,
            address: params.address,
            salary: params.salary,
        };
        return info;
    },
    Profit: async (objecProfit) => {
        return objecProfit.map(function (value, index) {
            var sum = 0;
            var allPrices = objecProfit[index].prices;
            allPrices.map((index) => sum += parseFloat(index));
            return sum;
        });
    }
}