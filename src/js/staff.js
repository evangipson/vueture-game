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
    const skillAmount = utils.random(3,6);
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

function createStaffMember() {
    return {
        name: createStaffName(),
        portrait: createStaffPortrait(),
        skills: pickStaffSkills()
    };
};

export default createStaffMember;