export const UserRole = {
    ADMIN: "admin",
    USER: "member",
    QUALIFIED: "qualified",
    HC: "hc",
    COMPNAY: "company",
};

export const permissions = {
    filter: {},
    view: {
        noAuth: ["ownerName", "attachments", "city", "reference", "industry", "title", "projectedAnnualProfit", "projectedAnnualTurnover",
            "description", "address", "state", "city", "area", "mapPositionLng", "mapPositionLat"],
        member: ["ownerName", "attachments", "city", "reference", "industry", "title", "projectedAnnualProfit", "projectedAnnualTurnover",
            "address", "state", "city", "area", "mapPositionLng", "mapPositionLat",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description", "services", "relocatable"],
        qualified: ["ownerName", "attachments", "city", "reference", "industry", "title", "currentDebts", "projectedAnnualTurnover",
            "lastAnnualTurnover", "lastAnnualProfit", "yearEstablished", "description",
            "services", "ownerManaged", "askingPrice", "projectedAnnualProf", "noOfShareholders", "noOfStaff", "relocatable", "address", "state", "city", "area",
            "mapPositionLng", "mapPositionLat"],
    },
}
