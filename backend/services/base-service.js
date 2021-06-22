module.exports = class Service {
  async findAll() {
    const found = this.model.find({})
    return found
  }

  async add(item) {
    return this.model.create(item)
  }

  // Implement del function to our code
  async del(itemId) {
    return this.model.deleteOne({
      _id: itemId
    })
  }

  async findItem(id) {
    return this.model.findById(id)
    // if (await this.checkIdValid(id)){
    //     return this.model.findById(id)
    // } else return false
  }
  //     async checkIdValid(id){
  //         if (id.match(/^[0-9a-fA-F]{24}$/)) {
  //             return true
  //           }
  //         else return false
  //     }
}
