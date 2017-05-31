import utils from "../ts/utilities.ts";
import skills from "./skills";

// TODO: Make this an SVG and not just a color
function createStaffPortrait() {
    const availableColors = [
        "#EE82EE",
        "#F77B7B",
        "#D76BA1",
        "#BA6BD7",
        "#B37BF7",
        "#7C64E0",
        "#5059C9",
        "#25B274",
        "#189B3D",
        "#A4453D",
        "#E84A00",
        "#E88B00",
        "#FF2C00",
        "#FF0068"
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
    return (utils.random(0, 10000) * experience) + utils.random(15000, 35000);
}

function generateExperience() {
    return utils.random(0, 15);
}

function findHappiness(staffMember, jobType) {
    const skillList = staffMember.skills;
    let happyIndex = 0;
    for(let skill in skillList) {
        for(let happyType in skill.happpiness) {
            if(happyType === jobType) {
                happyIndex++;
            }
        }
    }
    return happyIndex;
}

function generateFavoriteJob(skillList) {
    let targetBusinessType = [];
    let currentSkill = {};
    for(let i = 0; i < Object.keys(skillList).length; i++) {
        targetBusinessType[i] = [];
        currentSkill = skillList[Object.keys(skillList)[i]];
        for(let jobType in currentSkill.happy) {
            targetBusinessType[i].push(currentSkill.happy[jobType]);
        }
    }
    targetBusinessType = utils.getSimilarEntries(targetBusinessType);
    return targetBusinessType;
}

function createStaff() {
    const experience = generateExperience();
    const skills = pickStaffSkills();
    return {
        name: createStaffName(),
        portrait: createStaffPortrait(),
        skills: skills,
        experience: experience,
        salary: generateExpectedSalary(experience),
        favoriteJob: generateFavoriteJob(skills)
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
    createManager,
    findHappiness
};