   class Task {
    constructor() {
      this.data = [] 
    }
  
    create(newData) {
      this.data.push(newData)
      return newData
    }
  
    readAll() {
      return this.data
    }
  
    readById(id) {
      return this.data.find(item => item.id === id)
    }
  
    updateById(id, newData) {
      const index = this.data.findIndex(item => item.id === id)
      if (index === -1) {
        return null
      }
      this.data[index] = { ...this.data[index], ...newData }
      return this.data[index]
    }
  
    deleteById(id) {
      const index = this.data.findIndex(item => item.id === id)
      if (index === -1) {
        return null
      }
      const deletedItem = this.data[index]
      this.data.splice(index, 1)
      return deletedItem
    }
  }
  
  module.exports = Task ; 

  //trying to use sessiosn but it did not work 

  // class Task {
//   constructor(session) {
//     this.session = session;
//     if (!this.session.tasks) {
//       this.session.tasks = [];
//     }
//   }
  

//   create(newData) {
//     this.session.tasks.push(newData);
//     return newData;
//   }

//   readAll() {
//     return this.session.tasks;
//   }

//   readById(id) {
//     return this.session.tasks.find((item) => item.id === id);
//   }

//   updateById(id, newData) {
//     const index = this.session.tasks.findIndex((item) => item.id === id);
//     if (index === -1) {
//       return null;
//     }
//     this.session.tasks[index] = { ...this.session.tasks[index], ...newData };
//     return this.session.tasks[index];
//   }

//   deleteById(id) {
//     const index = this.session.tasks.findIndex((item) => item.id === id);
//     if (index === -1) {
//       return null;
//     }
//     const deletedItem = this.session.tasks[index];
//     this.session.tasks.splice(index, 1);
//     return deletedItem;
//   }
// }

// module.exports = Task;
