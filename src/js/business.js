import utils from "./utilities";

/* Object which represents the master "skeleton"
 * for the business object. */
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
        "Arts, Crafts, and Collectibles": {
            names: [
                "Bead's Beads",
                "Simply Beads",
                "Beads And Other Small Items",
                "New Anitques",
                "Baseball Card Store",
                "Sport Memora-Deal-ia"
            ]
        },
        "Beauty and Fragrances": {
            names: [
                "Gregio Vollaire Fragrances",
                "Anton Wuembre",
                "Petals Inc.",
                "Fumers",
                "Nose Invaders"
            ]
        },
        "Clothing, accessories, and shoes": {
            names: [
                "Forever 15",
                "Dry Cat",
                "Mallister",
                "Tunix",
                "General Clothes Outlet",
                "Trendy Chic",
                "A E R O"
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
        "Health and Personal Care": {
            names: [
                "Gambis & Gambler",
                "Beach Life",
                "Dr. Yankis",
                "Madler M.D.",
                "Rockter Chiropracty",
                "Corkter Chiro-Rhinoplasty"
            ]
        },
        "Real Estate": {
            names: [
                "Honey & Vinegar Realty",
                "Sugar & Salt Realty",
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
        "Electronics and Technology": {
            names: [
                "Rainbow Tech",
                "OfficePro",
                "Nerd Squad",
                "Geek Fixers",
                "Motherboard Mansion",
                "Software Hardware",
                "Yum Software",
                "AE Games",
                "Daxis Video Games",
                "Clonn's Old School Electronics",
                "Binguss Saminns' Computers",
                "Farbit's Hard Disks"
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
        "Sports and Outdoor": {
            names: [
                "Rebola's",
                "Territory Outdoor",
                "Krazy Kayaks"
            ]
        },
        "Pets and Animals": {
            names: [
                "PetGo",
                "Pet Inc.",
                "Adorable Store",
                "Binkus N' Friends",
                "Take Me Home!",
                "Bird Food & Other Things",
                "Buy Lizards Here"   
            ]
        },
        "Nonprofit": {
            names: [
                "LOL",
                "WHY",
                "NO",
                "STOP",
                "QUIT"
            ]
        },
        "Legal and Financial Services": {
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
        "Food Retail & Service": {
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
        },
        "Vehicle Sales": {
            names: [
                "Tulip City Motors",
                "ABD Cars",
                "Hambis Automotive",
                "Carz",
                "Stega Cars",
                "Logo Automoto",
                "Leopard",
                "Grindhini",
                "Vegast",
                "Locus",
                "Focus",
                "Focust",
                "Dangler's Used Autos",
                "Drinbin Used Auto Lot",
                "Canninban Car"
            ]
        },
        "Vehicle Repair": {
            names: [
                "A Carz Life",
                "Yubbit Automotive",
                "Rigatoni Automoni",
                "Canninban Car Repair",
                "Heineke",
                "AutoPlus"
            ]
        },
    },
    debt: 0,
    employees: 0,
    operationalCost: 0
};

// TODO: Needs to be updated
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
    model: businessModel
};