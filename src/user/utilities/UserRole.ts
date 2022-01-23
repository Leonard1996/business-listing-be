export const UserRole = {
    ADMIN: "admin",
    USER: "member",
    QUALIFIED: "qualified",
    HC: "hc",
    COMPNAY: "company",
};

export const permissions = {
    filter: {
        noAuth: ['projectedAnnualTurnover', 'projectedAnnualProfit', 'industry', 'reference', 'location'],
        member: ['projectedAnnualTurnover', 'projectedAnnualProfit', 'industry', 'reference', 'location'],
        qualified: ["location", "ownerName", "city", "reference", "industry", "title", "currentDebts", "projectedAnnualTurnover",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description",
            "services", "ownerManaged", "askingPrice", "projectedAnnualProfit", "noOfShareholders", "noOfStaff", "relocatable", "address", "state", "city", "area",
            "mapPositionLng", "mapPositionLat", "reasonForSelling", "tsCreated"],
        hc: ["location", "ownerName", "city", "reference", "industry", "title", "currentDebts", "projectedAnnualTurnover",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description",
            "services", "ownerManaged", "askingPrice", "projectedAnnualProfit", "noOfShareholders", "noOfStaff", "relocatable", "address", "state", "city", "area",
            "mapPositionLng", "mapPositionLat", "reasonForSelling", "tsCreated"],
        company: ["location", "ownerName", "city", "reference", "industry", "title", "currentDebts", "projectedAnnualTurnover",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description",
            "services", "ownerManaged", "askingPrice", "projectedAnnualProfit", "noOfShareholders", "noOfStaff", "relocatable", "address", "state", "city", "area",
            "mapPositionLng", "mapPositionLat", "reasonForSelling", "tsCreated"],
        admin: ["ownerName", "attachments", "city", "reference", "industry", "title", "currentDebts", "projectedAnnualTurnover",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description",
            "services", "ownerManaged", "askingPrice", "projectedAnnualProfit", "noOfShareholders", "noOfStaff", "relocatable", "address", "state", "city", "area",
            "mapPositionLng", "mapPositionLat", "reasonForSelling", "tsCreated"],

    },
    view: {
        noAuth: ["ownerName", "attachments", "city", "reference", "industry", "title", "projectedAnnualProfit", "projectedAnnualTurnover",
            "description", "address", "state", "city", "area", "mapPositionLng", "mapPositionLat"],
        member: ["ownerName", "attachments", "city", "reference", "industry", "title", "projectedAnnualProfit", "projectedAnnualTurnover",
            "address", "state", "city", "area", "mapPositionLng", "mapPositionLat",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description", "services", "relocatable"],
        qualified: ["ownerName", "attachments", "city", "reference", "industry", "title", "currentDebts", "projectedAnnualTurnover",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description",
            "services", "ownerManaged", "askingPrice", "projectedAnnualProfit", "noOfShareholders", "noOfStaff", "relocatable", "address", "state", "city", "area",
            "mapPositionLng", "mapPositionLat"],
        hc: ["ownerName", "attachments", "city", "reference", "industry", "title", "currentDebts", "projectedAnnualTurnover",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description",
            "services", "ownerManaged", "askingPrice", "projectedAnnualProfit", "noOfShareholders", "noOfStaff", "relocatable", "address", "state", "city", "area",
            "mapPositionLng", "mapPositionLat", "reasonForSelling", "tsCreated"],
        company: ["ownerName", "attachments", "city", "reference", "industry", "title", "currentDebts", "projectedAnnualTurnover",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description",
            "services", "ownerManaged", "askingPrice", "projectedAnnualProfit", "noOfShareholders", "noOfStaff", "relocatable", "address", "state", "city", "area",
            "mapPositionLng", "mapPositionLat", "reasonForSelling", "tsCreated"],
        admin: ["ownerName", "attachments", "city", "reference", "industry", "title", "currentDebts", "projectedAnnualTurnover",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description",
            "services", "ownerManaged", "askingPrice", "projectedAnnualProfit", "noOfShareholders", "noOfStaff", "relocatable", "address", "state", "city", "area",
            "mapPositionLng", "mapPositionLat", "reasonForSelling", "tsCreated"],
    },


}

export const permissionsMapped = {
    "location": [
        "city",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "ownerName": [
        "owner_name",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "city": [
        "city",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "reference": [
        "reference",
        (query) => {
            if (query) return `= '${query}'`
        }
    ],
    "industry": [
        "industry",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "title": [
        "title",
        (query) => {
            if (query) return `LIKE '${query}%'`
        }
    ],
    "currentDebts": [
        "current_debts",
        (query) => {
            if (query || query == 0) return `<= '${query}'`
        }
    ],
    "projectedAnnualTurnover": [
        "projected_annual_turnover",
        (query) => {
            if (query || query == 0) return `<= '${query}'`
        }
    ],
    "lastAnnualTurnover": [
        "last_annual_turnover",
        (query) => {
            if (query || query == 0) return `<= '${query}'`
        }
    ],
    "lastAnnualProfit": [
        "last_annual_profit",
        (query) => {
            if (query || query == 0) return `<= '${query}'`
        }
    ],
    "yearEstablished": [
        "year_established",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "description": [
        "description",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "services": [
        "services",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "ownerManaged": [
        "owner_managed",
        (query) => {
            if (query) return `= '${query}'`
        }
    ],
    "askingPrice": [
        "asking_price",
        (query) => {
            if (query || query == 0) return `<= '${query}'`
        }
    ],
    "projectedAnnualProfit": [
        "projected_annual_profit",
        (query) => {
            if (query || query == 0) return `<= '${query}'`
        }
    ],
    "noOfShareholders": [
        "no_of_shareholders",
        (query) => {
            if (query) return `= '${query}'`
        }
    ],
    "noOfStaff": [
        "no_of_staff",
        (query) => {
            if (query) return `= '${query}'`
        }
    ],
    "relocatable": [
        "relocatable",
        (query) => {
            if (query) return `= '${query}'`
        }
    ],
    "address": [
        "address",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "state": [
        "state",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "area": [
        "area",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "mapPositionLng": [
        "map_position_lng",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "mapPositionLat": [
        "map_position_lat",
        (query) => {
            if (query) return `LIKE '%${query}%'`
        }
    ],
    "reasonForSelling": [
        "reason_for_selling",
        "relocatable",
        (query) => {
            if (query) return `= '${query}'`
        }
    ],
    "tsCreated": [
        "ts_created",
        (query) => {
            if (query) return `datediff(Now(),ts_created) = ${query}`
        }
    ]
}


