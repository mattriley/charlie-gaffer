module.exports = ({ config }) => ({ message, isTest }) => {

    const lines = [];
    if (isTest) lines.push('TEST ONLY');
    lines.push(
        `Name: ${message.name}`,
        `Email: ${message.email}`,
        `Phone: ${message.phone}`,
        `Message: ${message.message}`
    );

    const prodSubject = `${message.name} sent you a message`;
    const subject = isTest ? `[TEST] ${prodSubject}` : prodSubject;

    const ToAddresses = [];
    const CcAddresses = [];

    if (isTest) {
        ToAddresses.push(config.technicalContactEmail);
    } else {
        ToAddresses.push(config.primaryContactEmail);
        CcAddresses.push(config.technicalContactEmail);
    }

    return {
        Source: config.noreplyEmail,
        Destination: { ToAddresses, CcAddresses },
        Message: {
            Subject: { Data: subject },
            Body: {
                Html: { Data: lines.join('<br/>') },
                Text: { Data: lines.join('\n') }
            }
        }
    };

};
