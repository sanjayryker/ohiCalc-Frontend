
export const keyInd1_data = [
    {
        tab:'Ind1',
        indName:'Land',
        subInd:['Country Area','Cultivated Area','Arable Land Area','Terrain Ruggedness Index'],
        subInd_weight:"25",
    },
    {
        tab:'Ind2',
        indName:'Forest',
        subInd:['Forest Area', 'Forest Transition Phase','Trees cover(loss)','Permanent Deforestation'],
        subInd_weight:"25",
    },
    {
        tab:'Ind3',
        indName:'Water',
        subInd:['Renewable Water Resource', 'Water Depenency Ratio', 'Water Stress'],
        subInd_weight:"33",
    },
    {
        tab:'Ind4',
        indName:'Air',
        subInd:['CO2 Emissions','Air Pollution Index'],
        subInd_weight:"50",
    },
    {
        tab:'Ind5',
        indName:'Natural Disasters',
        subInd:['Disaster Death Rate','Disaster Economic Loss','Disaster Affected Pollution'],
        subInd_weight:"33",
    }, 
]


export const keyInd2_data = [
    {
        tab:'Ind1',
        indName:'Justice',
        subInd:['Unsentenced Detainees','Property Rights','Corruption Perception Index','Press Freedom Index','Affordability of Justice'],
        subInd_weight:"20",
    },
    {
        tab:'Ind2',
        indName:'Governance',
        subInd:['Voice and Accountability', 'Government Spending','Public Social Expenditure','Public Education Expenditure', 'Public Health Expenditure','Political Stability','Government Effectiveness','Regulatory Quailty','Rule of Law','Control of Corruption'],
        subInd_weight:"10",
    },
]

export const keyInd3_data = [
    {
        tab:'Ind1',
        indName:'Finance',
        subInd:['GDP','GDP Deflator','Revenue Excluding Grants','Grants and Other Revenues','Adjusted GDP Growth'],
        subInd_weight:"20",
    },
    {
        tab:'Ind2',
        indName:'Work',
        subInd:['Labor Force Participation', 'Unemployment','Annual Working Hours','Youth Condition'],
        subInd_weight:"25",
    },
    {
        tab:'Ind3',
        indName:'Housing',
        subInd:['Own Outright','Rent at Reduced/Subsidized Price'],
        subInd_weight:"50",
    },
]

export const keyInd4_data = [
    {
        tab:'Ind1',
        indName:'Demography',
        subInd:['Life Expectancy','Child and Infant Mortality','Total Fertility Rate','Urbanization'],
        subInd_weight:"20",
    },
    {
        tab:'Ind2',
        indName:'Education',
        subInd:['Education Enrollment', 'Literacy','PISA Score','Science Performance','Higher Education','Expenditure on Research', 'Female Graduates','Researcher s population'],
        subInd_weight:"12.5",
    },
    {
        tab:'Ind3',
        indName:'Inequalities',
        subInd:['Gini Coefficient','Palmo Ratio','Human Development Index','Poverty Rate', 'Gender Inequality Index'],
        subInd_weight:"20",
    },
]

export const keyInd5_data = [
    {
        tab:'Ind1',
        indName:'Transport',
        subInd:['Railway Travel','Air Travel'],
        subInd_weight:"50",
    },
    {
        tab:'Ind2',
        indName:'Technology & Adoption',
        subInd:['Internet Population', 'Motor Vehicle Ownership','Mobile Cellular Subscription','Logistics Performance Index','Access to Electricity','Share of Renewable Energy'],
        subInd_weight:"16.6",
    },
    {
        tab:'Ind3',
        indName:'Consumption & Production',
        subInd:['Energy Consumption','Electricity Consumption','Solid Waste','Electronic Waste', 'SO2 Emissions','Nitrogen Emissions','Non-Recycled waste (Plastic ones)'],
        subInd_weight:"14.2",
    },
]

const datasss =  [
    {
        "subInd": 1,
        "subInd_name": "Forest Area",
        "best": "638804",
        "worst": "794200",
        "current": "713789",
        "normalized_value": ""
    },
    {
        "subInd": 2,
        "subInd_name": "Forest Transition Phase",
        "best": "7406.7",
        "worst": "101263.5",
        "current": "97412.9",
        "normalized_value": ""
    },
    {
        "subInd": 3,
        "subInd_name": "Trees cover(loss)",
        "best": "189",
        "worst": "47.8",
        "current": "123",
        "normalized_value": ""
    },
    {
        "subInd": 4,
        "subInd_name": "Permanent Deforestation",
        "best": "188",
        "worst": "45.6",
        "current": "121",
        "normalized_value": ""
    }
]