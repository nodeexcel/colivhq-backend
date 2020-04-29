const uuid = require('uuid');

module.exports.getMembers = async (req, res, next) => {
    let member = await req.member.get()

    let finalData = [];

    member.forEach(doc => {
        finalData.push({
            id: doc.id,
            ...doc.data()
        })
    });

    res.send({
        data: finalData
    });
}

module.exports.addMembers = async (req, res, next) => {
    let type = ['prospect', 'member', 'alumni'];
    let status = ['unqualified', 'attempting contacts', 'engaged', 'remarketing', 'bad lead', 'converted'];
    let ageGroup = ['18-22', '23-27', '28-32', '33-37', '38+'];
    let opportunityCheckFields = ['prefCity', 'prefNeighbourhood', 'prefBuilding', 'prefHome', 'prefRoomType', 'prefStartDate', 'prefEndDate', 'prefCommitLen', 'prefBudget', 'prefOtherRequitments'];
    let memberId, opportunityId, activityId;

    try {
        let member = await req.member.where('emailAddress', '==', req.body.emailAddress).get()

        if (!member.empty)
            throw new Error('email id already added')

        memberId = uuid.v4();
        activityId = uuid.v4();

        let memberData = {
            type: req.body.type ? req.body.type : 'prospect',
            status: req.body.status ? req.body.status : 'unqualified',
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            ageGroup: req.body.ageGroup,
            emailAddress: req.body.emailAddress,
            phone: req.body.phone,
            whatsApp: req.body.whatsApp,
            company: req.body.company,
            jobTitle: req.body.jobTitle,
            source: req.body.source,
            sourceDetails: req.body.sourceDetails,
            nationality: req.body.nationality,
            createdDate: new Date(),
            createdBy: 'user id',
            operatorId: "coliving company id",
        }

        let activityData = {
            memberId,
            memberFirst: req.body.firstName,
            memberLast: req.body.lastName,
            todo: true,
            todoDate: new Date(),
            createdDate: new Date(),
            createdBy: 'user id',
            operatorId: "coliving company id",
        }

        activityData.activityDescription = JSON.stringify(activityData);

        if (!type.includes(memberData.type))
            throw new Error('type can be only prospect, member, alumni');

        if (!status.includes(memberData.status))
            throw new Error('status can be only unqualified, attempting contacts, engaged, remarketing, bad lead, converted');

        if (!ageGroup.includes(memberData.ageGroup))
            throw new Error('ageGroup can be only 18-22, 23-27, 28-32, 33-37, 38+');

        await req.member.doc(memberId).set(memberData);

        const opportunityCheck = opportunityCheckFields.some(val => Object.keys(req.body).includes(val));

        if (opportunityCheck) {
            let opportunityData = {
                prefCity: req.body.prefCity ? req.body.prefCity : null,
                prefNeighbourhood: req.body.prefNeighbourhood ? req.body.prefNeighbourhood : null,
                prefBuilding: req.body.prefBuilding ? req.body.prefBuilding : null,
                prefHome: req.body.prefHome ? req.body.prefHome : null,
                prefRoomType: req.body.prefRoomType ? req.body.prefRoomType : null,
                prefStartDate: req.body.prefStartDate ? req.body.prefStartDate : null,
                prefEndDate: req.body.prefEndDate ? req.body.prefEndDate : null,
                prefCommitLen: req.body.prefCommitLen ? req.body.prefCommitLen : null,
                prefBudget: req.body.prefBudget ? req.body.prefBudget : null,
                prefOtherRequitments: req.body.prefOtherRequitments ? req.body.prefOtherRequitments : null,
            }
            opportunityId = uuid.v4();
            activityData.opportunityId = opportunityId;

            await req.opportunity.doc(opportunityId).set(opportunityData);
        }

        await req.activity.doc(activityId).set(activityData);

        res.send({
            status: 1,
            message: "member added"
        });
    } catch (error) {
        res.send({
            status: 0,
            message: error.message
        });
    }

}
