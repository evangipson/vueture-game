import * as Skills from "../ts/skills";
import * as Utils from "../ts/utilities";

/* ========================== */
/* VUETURE BUSINESS FUNCTIONS */
/* ========================== */

/**
 * Calculates the value that modifies the
 * value of the business.
 * @param {Number} The type of business that you want to evaluate.
 * @param {Number} The class of business that you want to evaluate.
 */
function calculateValueModifier(selectedBusinessType: number, selectedBusinessClass: number): number {
    let valueModifier: number = 0;
    // If staff at business
        // If they are happy
            // Add to evaluation
    // If company has been around
        // If they are historically good
            // Add to evalution
    return valueModifier;
}

function calculateValue(): void {
    // return previousValue + calculateValueModifier();
}

/* Object which represents the master "skeleton"
 * for the business object. */
export const model = {
    class: [
        "Small",
        "Medium",
        "Large",
        "Enterprise",
        "Conglomeration",
    ],
    /* If you add a new type, remember
     * to update some skills in staff.ts! */
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
                "Applewood",
            ]
        },
        "Arts, Crafts, and Collectibles": {
            names: [
                "Bead's Beads",
                "Simply Beads",
                "Beads And Other Small Items",
                "New Anitques",
                "Baseball Card Store",
                "Sport Memora-Deal-ia",
            ]
        },
        "Beauty and Fragrances": {
            names: [
                "Gregio Vollaire Fragrances",
                "Anton Wuembre",
                "Petals Inc.",
                "Fumers",
                "Nose Invaders",
            ]
        },
        "Clothing, Accessories, and Shoes": {
            names: [
                "Forever 15",
                "Dry Cat",
                "Mallister",
                "Tunix",
                "General Clothes Outlet",
                "Trendy Chic",
                "A E R O",
            ]
        },
        "Advertising Agency": {
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
                "Corkter Chiro-Rhinoplasty",
                "Doctors N' Doctors",
                "White Mage, M.D.",
                "Black Mage, D.D.S.",
                "Red Mage, M.D.",
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
                "4 Closures",
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
                "Farbit's Hard Disks",
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
                "Mutual Butlers",
            ]
        },
        "Sports and Outdoor": {
            names: [
                "Rebola's",
                "Territory Outdoor",
                "Krazy Kayaks",
                "Mobela's",
                "Rettela's",
                "Outdoor Lifestyles",
                "Indoors Shmindoors",
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
                "Buy Lizards Here",
            ]
        },
        "Nonprofit": {
            names: [
                "LOL",
                "WHY",
                "NO",
                "STOP",
                "QUIT",
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
                "Law Offices Of Dayumit",
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
                "Farm To Fable",
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
                "Canninban Car",
            ]
        },
        "Vehicle Repair": {
            names: [
                "A Carz Life",
                "Yubbit Automotive",
                "Rigatoni Automoni",
                "Canninban Car Repair",
                "Heineke",
                "AutoPlus",
            ]
        },
    },
    debt: 0,
    employees: 0,
    operationalCost: 0,
};

/**
 * Will calculate the cost of a business
 * based on the type of business, which should
 * be passed in.
 * @param {String} The class of business for which to calculate the cost.
 */
export function calculateCost(businessClass): string {
    let businessCost: number = 3000000;
    if (businessClass === "Small") {
        businessCost = Utils.random(4000, 6000);
    }
    else if (businessClass === "Medium") {
        businessCost = Utils.random(11000, 22000);
    }
    else if (businessClass === "Large") {
        businessCost = Utils.random(25000, 88000);
    }
    else if (businessClass === "Enterprise") {
        businessCost = Utils.random(105000, 800000);
    }
    // Now modify based on randomness
    businessCost = businessCost * (Math.random() * (1.55 - 0.75) + 0.75);
    // And return the string representation of the number with 2 decimal places.
    return businessCost.toFixed(2);
}