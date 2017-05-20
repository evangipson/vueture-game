import utils from "./utilities";
import skills from "./skills";

// TODO: Make this an SVG and not just a color
function createStaffPortrait() {
    const availableColors = [
        "#EE82EE",
        "#F77B7B",
        "#D76BA1",
        "#BA6BD7",
        "#B37BF7"
    ];
    return utils.randomElement(availableColors);
}

function pickStaffSkills() {
    // pick HOW many skills we get
    const skillAmount = utils.random(1,3);
    let staffSkillKey = "";
    let staffSkillProp = {};
    let skillsObject = {};
    // pick WHAT they are
    for(let i = 0; i < skillAmount; i++) {
        staffSkillKey = utils.randomObject(skills);
        staffSkillProp = skills[staffSkillKey];
        skillsObject[staffSkillKey] = staffSkillProp;
    }
    return skillsObject;
}

function pickManagerSkills() {
    // pick HOW many skills we get
    const skillAmount = utils.random(2,4);
    let staffSkillKey = "";
    let staffSkillProp = {};
    // pick WHAT they are
    for(let i = 0; i < skillAmount; i++) {
        staffSkillKey = utils.randomObject(skills);
        staffSkillProp = skills[staffSkillKey];
    }
    return {[staffSkillKey]: staffSkillProp};
}

function createStaffName() {
    return utils.createName() + " " + utils.createName();
};

function generateExpectedSalary(experience) {
    // TODO: Base this off of type AND experience!
    return utils.random(12000, 25000) * (experience + 1);
}

function generateExperience() {
    return utils.random(0, 8);
}

function createStaff() {
    const experience = generateExperience();
    return {
        name: createStaffName(),
        portrait: createStaffPortrait(),
        skills: pickStaffSkills(),
        experience: experience,
        salary: generateExpectedSalary(experience)
    };
};

function createManager() {
    return {
        name: createStaffName(),
        portrait: createStaffPortrait(),
        skills: pickManagerSkills(),
        experience: generateExperience(),
        salary: generateExpectedSalary()
    }
}

export default {
    createStaff,
    createManager
};