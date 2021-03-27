const Tea = require('../models/Tea');
const { sendEmail, sendEmailRevised } = require('../utils/amazon');

module.exports = class TeaService {
  static async create(teaItemObject) {
    await sendEmail(teaItemObject.name, teaItemObject.category, teaItemObject.origin);
    const newTea = await Tea.insert(teaItemObject);

    return newTea
  }

  static async getAllTea(arrayOfTeaObs) {
    
    const allTea = await Tea.getAll(arrayOfTeaObs)

    return allTea
  }

  static async getById(id) {
    const result = await Tea.getById(id);

    return result;


  }
  static async removeTea(id) {
    const result = await Tea.removeTea(id)

    return result;
  }

  static async editTeaQty(id, quantity) {
    const result = await Tea.editQty(id, quantity)
    sendEmailRevised('ROU GUI', 'Yancha', 'Wuyi', quantity)
    
    return result;
}

}