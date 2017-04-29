import utils from "./utilities"

const businessModel = {
    class: [
        "Small",
        "Medium",
        "Large",
        "Enterprise",
        "Conglomeration",
    ],
    type: [
        "Manufacturing",
        "Retail",
        "Creative Studio",
        "Real Estate",
        "Transportation",
        "Technology",
        "Sanitation",
        "Legal",
        "Food",
    ],
    debt: 0,
    employees: 0,
    operationalCost: 0
}

function constructBusiness() {
    let newBusiness = {};
    newBusiness.class = businessModel.class[0]; // Starting small
    newBusiness.type = utils.randomElement(businessModel.type);
    newBusiness.debt = utils.random(0,utils.random(50,300));
    newBusiness.employees = 0; //TODO: CreateEmployee (with salary and stuff)
    newBusiness.operationalCost = 0; //TODO: CalculateOperationCost (employees * their salary + something * debtPayment)
    return newBusiness
}

export default {
    constructBusiness: constructBusiness
}