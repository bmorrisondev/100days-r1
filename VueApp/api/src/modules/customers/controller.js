const Customer = require('./models/Customer')

exports.createCustomers = async (customers) =>{
    try {
        return await Customer.insertMany(customers)
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.getCustomers = async(query) => {
    try {
        // let search = await parseQuery(query)
        // return await Customer.find(search)
        return await Customer.find()
    } catch (err) {
        throw new Error(err.message)
    }
}

// exports.updateCustomer = async (customerId, updates) => {
//     return await Customer.findOneAndUpdate({ _id: customerId }, updates)
// }

// // TODO: Move into helper
// async function parseQuery (query) {
//     if(query != null){
//         let search = {}
//         if(query.id) {
//             search._id = query.id
//         }

//         if(query.firstName) {
//             search.firstName = query.firstName
//         }
//         return search
//     } else {
//         return {}
//     }
// }