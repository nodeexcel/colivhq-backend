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

    try {
        if (!type.includes(req.body.type))
            throw new Error('type can be only prospect, member, alumni');

        if (!status.includes(req.body.status))
            throw new Error('status can be only unqualified, attempting contacts, engaged, remarketing, bad lead, converted');

        if (!ageGroup.includes(req.body.ageGroup))
            throw new Error('ageGroup can be only 18-22, 23-27, 28-32, 33-37, 38+');

        let data = {
            type: req.body.type,
            status: req.body.status,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            image: req.body.image,
            gender: req.body.gender,
            ageGroup: req.body.ageGroup,
            emailAddress: req.body.emailAddress,
            phone: req.body.phone,
            whatsApp: req.body.whatsApp,
            company: req.body.company,
            jobTitle: req.body.jobTitle,
            standardizedJobTitle: req.body.standardizedJobTitle,
            source: req.body.source,
            sourceDetails: req.body.sourceDetails,
            memberSince: req.body.memberSince,
            dob: req.body.dob,
            nationality: req.body.nationality,
            passportNumber: req.body.passportNumber,
            passportCountry: req.body.passportCountry,
            passportExpiry: req.body.passportExpiry,
            visaNumber: req.body.visaNumber,
            visaCountry: req.body.visaCountry,
            visaExpiry: req.body.visaExpiry,
            createdDate: new Date(),
            createdBy: 'user id',
            operatorId: "coliving company id",
        }

        await req.member.doc(uuid.v4()).set(data);

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
