import utils from "./utilities";

const businessModel = {
    class: [
        "Small",
        "Medium",
        "Large",
        "Enterprise",
        "Conglomeration",
    ],
    type: {
        "Manufacturing": {
            names: [
                "Make-It",
                "Engineer Makers",
                "Builders",
                "Build N' Stuff",
                "Robot Assembly",
                "Safety Cone",
                "Pine",
                "Applewood"
            ]
        },
        "Retail": {
            names: [
                "Clonn's",
                "Binguss Saminns",
                "Farbit's",
                "General Clothes Outlet",
                "Trendy Chic",
                "A E R O",
                "BingBap Trendsetters"
            ]
        },
        "Creative Studio": {
            names: [
                "We Do You",
                "Screwers",
                "Sprocket Design",
                "Lump Studios",
                "Clear Circles",
                "Skware",
                "Pemtigone",
                "Davis & Mitchell",
                "Trendatt",
            ]
        },
        "Real Estate": {
            names: [
                "Honey & Vinegar Realty",
                "David & Davis",
                "Clover & Samson",
                "Harshbaw, Yeodel & Driggers",
                "Mibb Estates",
                "Cronlin Vista Sales",
                "Government Acquisitions",
                "FORE Closures",
                "4 Closures"
            ]
        },
        "Transportation": {
            names: [
                "Stega Cars",
                "Logo Automoto",
                "Rigatoni Automoni",
                "Leopard",
                "Grindhini",
                "Vegast",
                "Locus",
                "Focus",
                "Focust",
                "Yubbit Automotive",
                "Canninban Cars",
                "Dangler's Used Autos",
                "Drinbin Used Auto Lot"
            ]
        },
        "Technology": {
            names: [
                "Rainbow Tech",
                "OfficePro",
                "Nerd Squad",
                "Geek Fixers",
                "Software Hardware",
                "Yum Software",
                "AE Games",
                "Daxis"
            ]
        },
        "Sanitation": {
            names: [
                "Janitation Saniation",
                "Janitor Sanitors",
                "Janity Sanity",
                "Insane In The Jain Brain",
                "Brushers N' Moppers",
                "Christ Cleaners",
                "Sparkle",
                "Hand Maid",
                "Go Dish",
                "Clean 'Er Up",
                "Fixin' Maids",
                "Mutual Butlers"
            ]
        },
        "Legal": {
            names: [
                "Mippit Law",
                "Harer Law",
                "Murphy At Law",
                "Twelve, Eleven, and Seven",
                "David, Davis, & Dantt",
                "Dantt Offices",
                "Bysium Law offices",
                "Yandor Law",
                "Scribbit, Mason & Harding",
                "Warren, Dio, Mason & Baws",
                "Trembiss, State & Law",
                "Law Offices Of Dayumit"
            ]
        },
        "Food Service": {
            names: [
                "Non-Vegetarian Food",
                "Plants N' Things",
                "U.U.H.",
                "Terom Inc.",
                "Cow Blow",
                "Santa Grinders",
                "Deer Meat",
                "Monkeys Taste Fine",
                "Rabbits Eating Rabbits",
                "Table To Farm, Inc.",
                "Farm To Fable"
            ]
        }
    },
    debt: 0,
    employees: 0,
    operationalCost: 0
};

function constructBusiness() {
    let newBusiness = {};
    newBusiness.class = businessModel.class[0]; // Starting small
    newBusiness.type = utils.randomElement(Object.keys(businessModel.type));
    newBusiness.debt = utils.random(0,utils.random(50,300));
    newBusiness.name = utils.randomElement(businessModel.type[newBusiness.type].names);
    newBusiness.employees = 0; //TODO: CreateEmployee (with salary and stuff)
    newBusiness.operationalCost = 0; //TODO: CalculateOperationCost (employees * their salary + something * debtPayment)
    return newBusiness;
}

export default {
    constructBusiness: constructBusiness
};