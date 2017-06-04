import * as Skills from "./skills";
import * as Utils from "./utilities";

/* ======================= */
/* VUETURE STAFF FUNCTIONS */
/* ======================= */

// TODO: Make this an SVG and not just a color
function createStaffPortrait(): string {
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
        "#FF0068",
    ];
    return Utils.randomElement(availableColors);
}

function pickStaffSkills(): object {
    // pick HOW many skills we get
    const skillAmount: number = Utils.random(1, 3);
    let staffSkillKey: string = "";
    let staffSkillProp: object = {};
    let skillsObject: object = {};
    // pick WHAT they are
    for (let i = 0; i < skillAmount; i++) {
        staffSkillKey = Utils.randomObject(Skills.model);
        staffSkillProp = Skills.model[staffSkillKey];
        skillsObject[staffSkillKey] = staffSkillProp;
    }
    return skillsObject;
}

function pickManagerSkills(): object {
    // pick HOW many skills we get
    const skillAmount: number = Utils.random(2, 4);
    let staffSkillKey: string = "";
    let staffSkillProp: object = {};
    // pick WHAT they are
    for (let i = 0; i < skillAmount; i++) {
        staffSkillKey = Utils.randomObject(Skills.model);
        staffSkillProp = Skills.model[staffSkillKey];
    }
    return {[staffSkillKey]: staffSkillProp};
}

function createStaffName(): string {
    return Utils.createName() + " " + Utils.createName();
};

// TODO: Base this off of type AND experience!
function generateExpectedSalary(experience?: number): number {
    // Define experience if it wasn't defined
    if (experience === undefined) {
        experience = 1;
    }
    return (Utils.random(0, 10000) * experience) + Utils.random(15000, 35000);
}

function generateExperience(): number {
    return Utils.random(0, 15);
}

function generateFavoriteJob(skillList: object): string[] {
    let allBusinessTypes: string[][] = [];
    let targetBusinessTypes: string[] = [];
    let currentSkill: any = {};
    for (let i = 0; i < Object.keys(skillList).length; i++) {
        allBusinessTypes[i] = [];
        currentSkill = skillList[Object.keys(skillList)[i]];
        for (let jobType in currentSkill.happy) {
            allBusinessTypes[i].push(currentSkill.happy[jobType]);
        }
    }
    targetBusinessTypes = Utils.getSimilarEntries(allBusinessTypes);
    return targetBusinessTypes;
}

/* ================== */
/* External Functions */
/* ================== */

export function findHappiness(staffMember: any, jobType: string): number {
    const skillList: object = staffMember.skills;
    let happyIndex: number = 0;
    for (let skill in skillList) {
        for (let happyType in skillList[skill].happy) {
            if (happyType === jobType) {
                happyIndex++;
            }
        }
    }
    return happyIndex;
}

export function createStaff(): object {
    const experience: number = generateExperience();
    const skills: object = pickStaffSkills();
    return {
        name: createStaffName(),
        portrait: createStaffPortrait(),
        skills: skills,
        experience: experience,
        salary: generateExpectedSalary(experience),
        favoriteJob: generateFavoriteJob(skills),
    };
}

export function createManager(): object {
    return {
        name: createStaffName(),
        portrait: createStaffPortrait(),
        skills: pickManagerSkills(),
        experience: generateExperience(),
        salary: generateExpectedSalary(),
    };
}